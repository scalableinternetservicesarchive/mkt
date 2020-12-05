import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext } from 'react'
import { Posts } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { Order } from '../components/Order'
import { AppRouteParams } from '../nav/route'
import { FETCH_POSTS } from './fetchPosts'
import { Page } from './Page'

interface DashboardProps extends RouteComponentProps, AppRouteParams {}

export function Dashboard({ navigate }: DashboardProps) {
  const { user } = useContext(UserContext)
  const [filter, setFilter] = React.useState<{ userId: number } | undefined>()
  const { loading, data } = useQuery<Posts>(FETCH_POSTS, {
    variables: {
      sort: {
        field: 'timeCreated',
        ascending: false,
      },
      filter,
    },
  })

  if (loading || data == null) return null
  return (
    <Page>
      {user && (
        <Hero>
          <Button onClick={() => setFilter({ userId: user.id })}>My Orders</Button>
          <Spacer $w2 />
          <Button onClick={() => setFilter(undefined)}>All Orders</Button>
        </Hero>
      )}
      <Content>
        {data.posts.map(post => (
          <Order key={post.id} post={post} />
        ))}
        {user && (
          <Button
            style={{
              position: 'fixed',
              bottom: 64,
              right: 64,
            }}
            onClick={() => {
              if (navigate == null) return
              navigate('newPost').catch(err => {
                console.log('error', err)
              })
            }}
          >
            Add post
          </Button>
        )}
      </Content>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderWidth: '0px',
})

const Content = style('div', '', {
  display: 'flex',
})
