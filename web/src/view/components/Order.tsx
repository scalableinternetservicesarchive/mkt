import { RouteComponentProps, useNavigate } from '@reach/router'
import * as React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { H3 } from '../../style/header'
import { style } from '../../style/styled'
import { UserWidget } from '../components/UserWidget'
import { AppRouteParams } from '../nav/route'

interface Props {
  id: number
  title: string
  name: string
  description: string
  goal: number
  fulfilled: number
}

interface OrderProps extends RouteComponentProps, AppRouteParams {}

export function Order(props: OrderProps & Props) {
  const navigate = useNavigate()
  const { id, title, name, description, fulfilled, goal } = props
  return (
    <Card
      onClick={() => {
        navigate(`post/${id}`).catch(err => {
          console.log('error', err)
        })
      }}
    >
      <UserWidget name={name} />
      <Content>
        <H3>{title}</H3>
        <p>{description}</p>
      </Content>
      <Content>
        <PieChart
          style={{}}
          data={[
            { title: `Fulfilled: $${fulfilled}`, value: fulfilled, color: '#E38627' },
            { title: `Goal: $${goal}`, value: goal - fulfilled, color: '#bfbfbf' },
          ]}
          // reveal={percentage}
          startAngle={-90}
          radius={30}
          lineWidth={30}
          paddingAngle={5}
        />
        <H3 style={{ textAlign: 'center' }}>
          ${fulfilled}/${goal}
        </H3>
      </Content>
    </Card>
  )
}

const Card = style('div', 'flex-l', {
  padding: 16,
  margin: 8,
  background: '#eee',
  width: 480,
})

const Content = style('div', 'flex-l', {
  flexDirection: 'column',
  margin: 8,
})
