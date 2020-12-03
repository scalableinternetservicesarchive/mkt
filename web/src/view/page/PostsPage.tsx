import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Post } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { FETCH_POST } from './fetchPosts'
import { Page } from './Page'

interface Props {
  postId?: number
}
interface PostsPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// TODO: remove PostsPageProps (only necessary for router)
export function PostsPage({ postId }: PostsPageProps & Props) {
  const { loading, data } = useQuery<Post>(FETCH_POST, {
    variables: { postId: Number(postId) },
  })
  if (loading || data?.post == null) return null
  const { title, description } = data.post
  return (
    <Page>
      <Content>
        <LContent>
          <H2>{title}</H2>
          <BodyText>People part of this order:</BodyText>
          {/* Some stuff will go here for users part of this order */}
          <Spacer $h4 />
          <BodyText>{description}</BodyText>
        </LContent>
        <RContent>
          <H2>
            ${100} / ${200}
          </H2>
          <H3>fulfilled</H3>
          <Spacer $h6 />
          <Button>Join this order</Button>
        </RContent>
      </Content>
    </Page>
  )
}
const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-70-l mr4-l')

const RContent = style('div', 'flex-grow-0  w-30-l', { minWidth: 'max-content' })
