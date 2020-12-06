import { RouteComponentProps, useNavigate } from '@reach/router'
import * as React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { Posts_posts } from '../../graphql/query.gen'
import { H2, H4 } from '../../style/header'
import { style } from '../../style/styled'
import { UserWidget } from '../components/UserWidget'
import { AppRouteParams } from '../nav/route'

interface Props {
  post: Posts_posts
}

interface OrderProps extends RouteComponentProps, AppRouteParams {}

export function Order(props: OrderProps & Props) {
  const navigate = useNavigate()
  const { id, title, description, goal, owner, commits } = props.post
  let totalCommitted = 0

  commits.forEach(commit => {
    totalCommitted += commit.amount
  })

  return (
    <Card
      onClick={() => {
        navigate(`post/${id}`).catch(err => {
          console.log('error', err)
        })
      }}
    >
      <UserWidget name={owner.name} />
      <div style={{ marginLeft: 12, flex: 1 }}>
        <H2>{title}</H2>
        <p>{description}</p>
      </div>
      <div style={{ width: 100 }}>
        <PieChart
          style={{ height: 100, width: 100 }}
          data={[
            { title: `Fulfilled: $${totalCommitted}`, value: totalCommitted, color: '#E38627' },
            { title: `Goal: $${goal}`, value: goal, color: '#bfbfbf' },
          ]}
          // reveal={percentage}
          startAngle={-90}
          radius={30}
          lineWidth={30}
          paddingAngle={5}
        />
        <H4 style={{ textAlign: 'center' }}>
          ${totalCommitted}/${goal}
        </H4>
      </div>
    </Card>
  )
}

const Card = style('div', 'pa2 flex-l br2', {
  margin: 8,
  border: 'solid #aaa',
  borderWidth: 1,
  width: 500,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
})
