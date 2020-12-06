import { sleep } from 'k6'
import http from 'k6/http'
import { Counter, Rate } from 'k6/metrics'

export const options = {
  scenarios: {
    example_scenario: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '60s', target: 250 },
        { duration: '60s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },
}
// export const options = {
//   scenarios: {
//     example_scenario: {
//       executor: 'constant-vus',
//       vus: 1000,
//       duration: '30s',
//     },
//   },
// }

export default function () {
  const probabilityToPost = 0.05

  // choose a random user to impersonate
  const userId = Math.round(Math.random() * 3) + 1

  // Count total number of posts (to be used later)
  const count = JSON.parse(
    http.post('http://localhost:3000/graphql', '{"operationName":null,"variables":{},"query":"{  numPosts}"}', {
      headers: {
        'Content-Type': 'application/json',
      },
    }).body
  ).data.numPosts

  recordRates(http.get('http://localhost:3000/app'))

  if (Math.random() < probabilityToPost) {
    // Generate some fake data
    const res = http.get('https://fakerapi.it/api/v1/products?_quantity=1&_taxes=12&_categories_type=uuid')
    const data = JSON.parse(res.body).data[0]

    // Call gql endpoint for creating post
    recordRates(
      http.post(
        'http://localhost:3000/graphql?createPost=1',
        `{"operationName":"CreatePost","variables":{"input":{"title":"${data.name}","description":"${
          data.description
        }","goal":${Math.round(
          Math.random() * 1000 + 100
        )},"merchant":"test merchant","ownerId":${userId}}},"query":"mutation CreatePost($input: CreatePostInput!) {  createPost(input: $input) {    id    __typename  }}"}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    )
  } else {
    // Generate some fake data
    const amt = Math.round(Math.random() * 90 + 10)
    const post = Math.round(Math.random() * (count - 1) + 1)

    // Call gql endpoint for committing to a post
    const query = JSON.stringify({
      operationName: null,
      variables: {},
      query: `mutation {commit(input: {amount: ${amt}, itemUrl: "google.com", postId: ${post}, userId: ${userId}})}`,
    })
    http.post('http://localhost:3000/graphql?commit=1', query, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // console.log(userId, 'committed', amt, 'to', post)
  }

  // Simulate user browsing posts for a bit
  for (let i = 0; i < 10; i++) {
    const post = Math.round(Math.random() * count + 1)
    recordRates(http.get('http://localhost:3000/app/post/' + post))
    sleep(Math.random())
  }
}

const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}
