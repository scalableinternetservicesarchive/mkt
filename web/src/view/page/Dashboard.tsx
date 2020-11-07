import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { ColorName, Colors } from '../../../../common/src/colors'
import { Button } from '../../style/button'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { Order } from '../components/Order'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface DashboardProps extends RouteComponentProps, AppRouteParams {}

export function Dashboard(props: DashboardProps) {
  return (
    <Page>
      <Hero>
        <Button>My Orders</Button>
        <Spacer $w2 />
        <Button>Other Orders</Button>
      </Hero>
      <Content>
        <LContent>
          <Section>
            <Order
              name="Param Shah"
              goal={150}
              fulfilled={40}
              description="I want to buy some leggings"
              title="Lululemon Leggings"
            />
          </Section>
          <Spacer $h3 />
          <Section>
            <Order
              name="Param Shah"
              goal={150}
              fulfilled={40}
              description="I want to buy some leggings"
              title="Lululemon Leggings"
            />
          </Section>
        </LContent>
        <RContent>
          <Section>
            <Order
              name="Param Shah"
              goal={150}
              fulfilled={40}
              description="I want to buy some leggings"
              title="Lululemon Leggings"
            />
          </Section>
          <Spacer $h3 />
          <Section>
            <Order
              name="Param Shah"
              goal={150}
              fulfilled={40}
              description="I want to buy some leggings"
              title="Lululemon Leggings"
            />
          </Section>
        </RContent>
      </Content>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderWidth: '0px',
})

const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-70-l mr4-l')

const RContent = style('div', 'flex-grow-0 w-70-l mr4-l')

const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))
