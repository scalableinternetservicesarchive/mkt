import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { H3, H5 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserWidget } from '../components/UserWidget'
import { AppRouteParams } from '../nav/route'

interface Props {
  title: string
  name: string
  description: string
  goal: number
  fulfilled: number
}

interface OrderProps extends RouteComponentProps, AppRouteParams {}

export function Order(props: OrderProps & Props) {
  const { title, name, description, fulfilled, goal } = props
  return (
    <Content>
      <UserWidget name={name} />
      <Spacer $h3 $w6 />
      <LContent>
        <H3>{title}</H3>
        <Spacer $h2 />
        <H5>{description}</H5>
      </LContent>
      <Spacer $w6 />
      <H3>
        ${fulfilled}/${goal}
      </H3>
    </Content>
  )
}

const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-70-l', { minWidth: 'max-content' })
