import * as React from 'react'
import { style } from '../../style/styled'

export function UserWidget(props: { name: string; small?: boolean }) {
  const { name, small } = props
  return (
    <div className="pa1 tc">
      <div className={`bg-silver br-100 h${small ? '2' : '3'} w${small ? '2' : '3'} dib`}></div>
      {!small && <NameText className="f6 mt1 mw4">{name}</NameText>}
    </div>
  )
}

const NameText = style('div', { overflowWrap: 'break-word', margin: '0 auto' })
