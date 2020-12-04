import { useMutation, useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { Commit, Post } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { BodyText } from '../../style/text'
import { UserContext } from '../auth/user'
import { UserWidget } from '../components/UserWidget'
import { AppRouteParams } from '../nav/route'
import { COMMIT, FETCH_POST } from './fetchPosts'
import { Page } from './Page'

interface Props {
  postId?: number
}
interface PostsPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// TODO: remove PostsPageProps (only necessary for router)
export function PostsPage({ postId }: PostsPageProps & Props) {
  const { user } = React.useContext(UserContext)
  const [contribution, setContribution] = useState('')
  const [committing, setCommitting] = useState(false)
  const { loading, data } = useQuery<Post>(FETCH_POST, {
    variables: { postId: Number(postId) },
  })
  const [commit] = useMutation<Commit>(COMMIT)

  if (loading || data?.post == null) return null
  const { title, description, goal, owner, commits } = data.post

  let totalCommitted = 0
  commits.forEach(commit => {
    totalCommitted += commit.amount
  })
  return (
    <Page>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <H3>Created by:</H3>
          <UserWidget name={owner.name} />
        </div>
        <div className="ma4">
          <H2>{title}</H2>
          <BodyText>People part of this order:</BodyText>
          <Spacer $h3 />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {commits.map(commit => (
              <div key={commit.user.name} style={{ marginRight: 8 }}>
                <UserWidget name={commit.user.name} small />
                <p style={{ textAlign: 'center' }}>${commit.amount}</p>
              </div>
            ))}
          </div>
          <Spacer $h4 />
          <H2>Description:</H2>
          <BodyText>{description}</BodyText>
        </div>
        <div className="pa4">
          <H2>
            ${totalCommitted} / ${goal}
          </H2>
          <H3>fulfilled</H3>
          <Spacer $h6 />
          {committing ? (
            <>
              <label htmlFor="name" className="f6 b db mb2">
                Amount
              </label>
              <input
                id="name"
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
                type="text"
                value={contribution}
                onChange={e => setContribution(e.target.value)}
              />
              <Button
                onClick={() => {
                  void commit({
                    variables: { input: { amount: Number(contribution), postId: data.post?.id, userId: user?.id } },
                  })
                  setContribution('')
                  setCommitting(false)
                }}
              >
                Submit
              </Button>
            </>
          ) : (
            <Button onClick={() => setCommitting(true)}>Join this order</Button>
          )}
        </div>
      </div>
    </Page>
  )
}
