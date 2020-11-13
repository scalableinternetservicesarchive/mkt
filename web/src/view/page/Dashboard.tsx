import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchPosts } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { Order } from '../components/Order'
import { AppRouteParams } from '../nav/route'
import { fetchPosts } from './fetchPosts'
import { Page } from './Page'

interface DashboardProps extends RouteComponentProps, AppRouteParams {}

export function Dashboard(_: DashboardProps) {
  const { loading, data } = useQuery<FetchPosts>(fetchPosts)
  if (loading || data == null) return null
  console.log(data)
  return (
    <Page>
      <Hero>
        <Button>My Orders</Button>
        <Spacer $w2 />
        <Button>Other Orders</Button>
      </Hero>
      <Content>
        <Order
          name="Param Shah"
          goal={150}
          fulfilled={40}
          description="I want to buy some leggings"
          title="Lululemon Leggings"
        />
        <Order
          name="Param Shah"
          goal={150}
          fulfilled={40}
          description="I want to buy some leggings"
          title="Lululemon Leggings"
        />
        <Order
          name="Param Shah"
          goal={150}
          fulfilled={40}
          description="I want to buy some leggings"
          title="Lululemon Leggings"
        />
        <Order
          name="Param Shah"
          goal={150}
          fulfilled={40}
          description="I want to buy some leggings"
          title="Lululemon Leggings"
        />
        <Button
          style={{
            position: 'absolute',
            bottom: 64,
            right: 64,
          }}
        >
          Add post
        </Button>
      </Content>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderWidth: '0px',
})

const Content = style('div', 'flex-l', {
  display: 'grid',
})
