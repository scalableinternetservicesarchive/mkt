import * as React from 'react'
import { UserContext } from '../auth/user'
import { UserWidget } from '../components/UserWidget'

export function NavBar() {
  const { user } = React.useContext(UserContext)
  return (
    <nav className="fixed bg-black-90 top-0 left-0 w-100 shadow-3 flex justify-between bb b--white-10">
      <a className="link white-70 hover-white no-underline flex items-center pa3" href="/app">
        MKT
      </a>
      <div className="flex-grow pa3 flex items-center">
        {!user ? (
          <>
            <a className="f6 link dib white dim mr3 mr4-ns" href="/app/login">
              Sign In
            </a>
            <a
              className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
              href="/app/signup"
            >
              Sign Up
            </a>
          </>
        ) : (
          <>
            <a
              className="f6 mr3 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
              href="/app/login"
            >
              Sign Out
            </a>
            <UserWidget small />
          </>
        )}
      </div>
    </nav>
  )
}
