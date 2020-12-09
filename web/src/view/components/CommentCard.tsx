import * as React from 'react'
import { Post_post_comments } from '../../graphql/query.gen'
import { style } from '../../style/styled'
import { UserWidget } from './UserWidget'

interface Props {
  comment: Post_post_comments
}
export default function CommentCard(props: Props) {
  const { user, body } = props.comment
  return (
    <Card>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: 8 }}>
        <UserWidget name={user.name} />
        <div style={{ flexGrow: 1, marginLeft: 16 }}>{body}</div>
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
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
})
