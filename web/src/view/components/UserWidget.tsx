import * as React from 'react'
import { style } from '../../style/styled'

export function UserWidget(props: { name: string }) {
  const { name } = props
  return (
    <>
      <div className="pa1 tc">
        <div className="bg-silver br-100 h3 w3 dib"></div>
        <NameText className="f6 mt1 mw4">{name}</NameText>
      </div>
    </>
  )
}

const NameText = style('div', { overflowWrap: 'break-word', margin: '0 auto' })
