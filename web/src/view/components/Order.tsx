import { RouteComponentProps, useNavigate } from '@reach/router'
import * as React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { H2, H4 } from '../../style/header'
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
      <Content>
        <UserWidget name={name} />
      </Content>
      <Content style={{ width: '100%', height: '100%' }}>
        <H2>{title}</H2>
        <p>{description}</p>
      </Content>
      <Content style={{ width: 100 }}>
        <PieChart
          style={{ height: 100, width: 100 }}
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
        <H4 style={{ textAlign: 'center' }}>
          ${fulfilled}/${goal}
        </H4>
      </Content>
    </Card>
  )
}

const Card = style('div', 'pa2 flex-l br4', {
  margin: 8,
  background: '#eee',
  width: 480,
  alignItems: 'center',
  justifyContent: 'flex-start',
})

const Content = style('div', 'flex-l', {
  margin: 8,
  flexDirection: 'column',
})
