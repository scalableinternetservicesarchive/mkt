import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { H3 } from '../../style/header'
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
  // const percentage = (fulfilled / goal) * 100
  return (
    <Card>
      <UserWidget name={name} />
      <Content>
        <H3>{title}</H3>
        <p>{description}</p>
      </Content>
      {/* <PieChart
        style={{
          height: '100%',
          width: '100%',
        }}
        data={[
          { title: `Fulfilled: $${fulfilled}`, value: fulfilled, color: '#E38627' },
          { title: `Goal: $${goal}`, value: goal - fulfilled, color: '#bfbfbf' },
        ]}
        // reveal={percentage}
        startAngle={-90}
        radius={30}
        lineWidth={30}
        paddingAngle={5}
      /> */}
      <H3>
        ${fulfilled}/${goal}
      </H3>
    </Card>
  )
}

const Card = style('div', 'flex-l', {
  padding: 16,
  background: '#eee',
  width: 480,
})

const Content = style('div', 'flex-l', {
  flexDirection: 'column',
})
