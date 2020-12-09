import { useMutation, useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { Comment, Commit, Post } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { BodyText } from '../../style/text'
import { UserContext } from '../auth/user'
import CommentCard from '../components/CommentCard'
import { UserWidget } from '../components/UserWidget'
import { AppRouteParams } from '../nav/route'
import { lerpColor } from '../utils'
import { COMMIT, CREATE_COMMENT, FETCH_POST } from './fetchPosts'
import { Page } from './Page'

interface Props {
  postId?: number
}
interface PostsPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// TODO: remove PostsPageProps (only necessary for router)
export function PostsPage({ postId, navigate }: PostsPageProps & Props) {
  const { user } = React.useContext(UserContext)
  const [contribution, setContribution] = useState('')
  const [itemUrl, setItemUrl] = useState('')
  const [currentComment, setCurrentComment] = useState('')
  const [committing, setCommitting] = useState(false)
  const { loading, data } = useQuery<Post>(FETCH_POST, { variables: { postId: Number(postId) } })
  const [commit] = useMutation<Commit>(COMMIT)
  const [submitComment] = useMutation<Comment>(CREATE_COMMENT)

  if (loading || data?.post == null) return null
  const { picture, title, description, goal, owner, commits, comments } = data.post

  let totalCommitted = 0
  commits.forEach(commit => {
    totalCommitted += commit.amount
  })

  const userIsOwner = user?.id === owner.id

  const tryCommit = () => {
    console.log('user in commit:', user)
    if (!user) {
      if (navigate == null) return
      navigate('/app/login', { replace: false }).catch(err => {
        console.log('error', err)
      })
    } else {
      void commit({
        variables: {
          input: { amount: Number(contribution), itemUrl: itemUrl, postId: data.post?.id, userId: user?.id },
        },
      })
      setContribution('')
      setCommitting(false)
    }
  }

  return (
    <Page>
      <div
        style={{
          width: 300,
          height: 300,
          marginRight: 12,
          backgroundColor: '#eee',
          backgroundImage: picture ? `url(${picture})` : undefined,
          backgroundSize: 'cover',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div className="ma4" style={{ display: 'flex', flexDirection: 'column', maxWidth: 160 }}>
          <H3>Created by:</H3>
          <Spacer $h3 />
          <UserWidget name={owner.name} picture={owner.picture} />
          {userIsOwner && (
            <>
              <Spacer $h3 />
              <H3>Items to order:</H3>
              <Spacer $h3 />
              {commits.map(commit => (
                <a key={commit.user.name} href={commit.itemUrl}>
                  {commit.user.name}'s item
                </a>
              ))}
            </>
          )}
        </div>
        <div className="ma4" style={{ maxWidth: 500 }}>
          <H2>{title}</H2>
          <BodyText>People part of this order:</BodyText>
          <Spacer $h3 />
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {commits.map(commit => (
              <div key={commit.user.name} style={{ marginRight: 8 }}>
                <UserWidget name={commit.user.name} picture={commit.user.picture} small />
                <p style={{ textAlign: 'center' }}>${commit.amount}</p>
              </div>
            ))}
          </div>
          <Spacer $h4 />
          <H2>Description:</H2>
          <BodyText>{description}</BodyText>
        </div>
        <div className="ma4">
          <PieChart
            style={{ height: 100, width: 100 }}
            data={[
              {
                title: `Fulfilled: $${totalCommitted}`,
                value: totalCommitted,
                color: goal > totalCommitted ? lerpColor('#bb1111', '#ffff11', totalCommitted / goal) : '#2a2',
              },
              { title: `Goal: $${goal - totalCommitted}`, value: Math.max(goal - totalCommitted, 0), color: '#bfbfbf' },
            ]}
            startAngle={-90}
            radius={30}
            lineWidth={30}
            paddingAngle={0}
          />
          <H2>
            ${totalCommitted} / ${goal}
          </H2>
          <H3>fulfilled</H3>
          <Spacer $h6 />
          {committing ? (
            <>
              <label htmlFor="contribution" className="f6 b db mb2">
                Amount
              </label>
              <input
                id="contribution"
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
                type="text"
                value={contribution}
                onChange={e => setContribution(e.target.value)}
              />
              <label htmlFor="url" className="f6 b db mb2">
                Item URL
              </label>
              <input
                id="url"
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
                type="text"
                value={itemUrl}
                onChange={e => setItemUrl(e.target.value)}
              />
              <Spacer $h6 />
              <Button onClick={tryCommit}>Submit</Button>
            </>
          ) : (
            <Button onClick={() => setCommitting(true)}>Join this order</Button>
          )}
        </div>
      </div>
      <Spacer $h3 />
      <H2>Comments</H2>
      <Spacer $h3 />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <textarea
          style={{ width: 500, marginBottom: 8 }}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          value={currentComment}
          onChange={e => setCurrentComment(e.target.value)}
        />
        <Button
          onClick={() => {
            void submitComment({
              variables: {
                input: {
                  body: currentComment,
                  postId: Number(postId),
                  userId: user?.id,
                },
              },
            })
            setCurrentComment('')
          }}
        >
          Comment
        </Button>
      </div>
      <Spacer $h3 />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {comments.map((comment, i) => (
          <CommentCard key={i} comment={comment} />
        ))}
      </div>
    </Page>
  )
}
