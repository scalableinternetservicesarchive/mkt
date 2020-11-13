import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Button } from '../../style/button'
import { H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  // title: string
  // description: string
  // // TODO: users: user[]
  // goal: number
  // fulfilled: number
}
interface PostsPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// TODO: remove PostsPageProps (only necessary for router)
export function PostsPage(props: PostsPageProps & Props) {
  const { title, description, goal, fulfilled } = {
    title: 'title',
    description: 'description',
    goal: '500',
    fulfilled: '100',
  } //props
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
            ${fulfilled} / ${goal}
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
