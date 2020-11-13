import { Link } from '@reach/router'
import React from 'react'
import { style } from '../../style/styled'
import { UserWidget } from '../components/UserWidget'

export function NavBar() {
  return (
    <>
      <NavBarStyle>
        <Link to="/app/index" style={{ textDecorationLine: 'none' }}>
          Marketplace
        </Link>
        <UserWidget name="your name" small />
      </NavBarStyle>
    </>
  )
}

const NavBarStyle = style('div', 'fixed top-0 left-0 w-100 shadow-3 f3 b pa3', {
  width: '100%',
  background: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
})
