import { ApolloProvider, useQuery } from '@apollo/client'
import { Router } from '@reach/router'
import * as React from 'react'
import { hydrate, render } from 'react-dom'
import { Provider as StyletronProvider } from 'styletron-react'
import { appContext } from '../../../common/src/context'
import { getApolloClient } from '../graphql/apolloClient'
import { FetchUserContext } from '../graphql/query.gen'
import { style } from '../style/styled'
import { fetchUser } from './auth/fetchUser'
import { Login } from './auth/Login'
import { SignUp } from './auth/SignUp'
import { UserContext, UserCtx } from './auth/user'
import { Route } from './nav/route'
import { Dashboard } from './page/Dashboard'
import { NewPost } from './page/NewPost'
import { PostsPage } from './page/PostsPage'

const Styletron = require('styletron-engine-monolithic')

export function init() {
  const renderFn = appContext().serverRendered ? hydrate : render
  const engine = new Styletron.Client({
    hydrate: document.getElementsByClassName('_styletron_hydrate_'),
  })

  renderFn(
    <ApolloProvider client={getApolloClient()}>
      <StyletronProvider value={engine}>
        <App />
      </StyletronProvider>
    </ApolloProvider>,
    document.getElementById('app')
  )
}

export function App() {
  const { loading, data } = useQuery<FetchUserContext>(fetchUser)
  if (loading || data == null) {
    return null
  }

  return (
    <UserContext.Provider value={new UserCtx(data.self)}>
      <AppBody />
    </UserContext.Provider>
  )
}

export function AppBody() {
  return (
    <>
      <Router className={bodyClass}>
        <Dashboard path={Route.DASHBOARD} />
        <PostsPage path={Route.POSTS} />
        <NewPost path={Route.NEW_POST} />
        <Login path={Route.LOGIN} />
        <SignUp path={Route.SIGNUP} />
      </Router>
      <Footer>
        <FooterText>© 2020 MKT</FooterText>
      </Footer>
    </>
  )
}

const bodyClass = 'flex flex-column items-center mh2 mh3-ns mh5-l pt6 min-vh-100 sans-serif'

const Footer = style('footer', 'fixed flex items-center bottom-0 w-100')

const FooterText = style('small', 'mid-gray avenir', { margin: 'auto', opacity: '0.2' })
