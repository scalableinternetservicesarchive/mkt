import { Link } from '@reach/router'
import * as React from 'react'
import { useContext } from 'react'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { UserWidget } from '../components/UserWidget'

export function NavBar() {
  const { user } = useContext(UserContext)
  return (
    <NavBarStyle>
      <Link to="/app" style={{ textDecorationLine: 'none' }}>
        Marketplace
      </Link>
      {user ? <UserWidget name={user?.name} small /> : <Link to="/app/login">Login</Link>}
    </NavBarStyle>
  )
}

const NavBarStyle = style('div', 'fixed top-0 left-0 w-100 shadow-3 f3 b pa3', {
  width: '100%',
  background: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
})
