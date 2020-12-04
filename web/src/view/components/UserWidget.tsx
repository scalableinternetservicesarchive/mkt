import * as React from 'react'
import { style } from '../../style/styled'

export function UserWidget(props: { name?: string; small?: boolean }) {
  const { name, small } = props
  return (
    <div className="tc">
      <img
        src="/app/assets/images/blank-profile-picture.png"
        className={small ? 'br-100 h2 w2 dib' : 'br-100 h3 w3 dib'}
        alt="avatar"
      />
      {name && <NameText className="f6 mt1 mw4">{name}</NameText>}
    </div>
  )
}

const NameText = style('div', { overflowWrap: 'break-word', margin: '0 auto' })
