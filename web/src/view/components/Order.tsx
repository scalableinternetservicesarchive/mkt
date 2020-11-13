import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
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

interface OrderProps extends RouteComponentProps, AppRouteParams { }

export function Order(props: OrderProps & Props) {
  const { title, name, description, fulfilled, goal } = props
  // const percentage = (fulfilled / goal) * 100
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
      <PieChart
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
      {/* <H3>
        ${fulfilled}/${goal}
      </H3> */}
    </Content>
  )
}

const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-70-l', { minWidth: 'max-content' })
