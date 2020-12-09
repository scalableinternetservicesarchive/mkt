import { useMutation } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { CreatePost } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { PictureUpload } from '../components/PictureUpload'
import { AppRouteParams } from '../nav/route'
import { CREATE_POST } from './fetchPosts'
import { Page } from './Page'
interface Props {
  postId?: number
}
interface NewPostProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NewPost({ navigate }: NewPostProps & Props) {
  const { user } = React.useContext(UserContext)
  const [createPost] = useMutation<CreatePost>(CREATE_POST)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [merchant, setMerchant] = React.useState('')
  const [goal, setGoal] = React.useState('')
  const [file, setFile] = React.useState<string | null>(null)

  return (
    <Page>
      <PictureUpload onUpload={setFile} />
      <Content>
        <LContent>
          <label htmlFor="name" className="f6 b db mb2">
            Title
          </label>
          <input
            id="name"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label htmlFor="name" className="f6 b db mb2">
            Merchant
          </label>
          <input
            id="name"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            value={merchant}
            onChange={e => setMerchant(e.target.value)}
          />
          <label htmlFor="description" className="f6 b db mb2">
            Description
          </label>
          <textarea
            id="description"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </LContent>
        <RContent>
          <label htmlFor="name" className="f6 b db mb2">
            Order minimum
          </label>
          <input
            id="name"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            value={goal}
            onChange={e => setGoal(e.target.value)}
          />
          <Spacer $h6 />
          <Button
            onClick={() => {
              void createPost({
                variables: {
                  input: {
                    title,
                    description,
                    goal: Number(goal),
                    merchant,
                    ownerId: user?.id,
                    picture: file,
                  },
                },
              })
              setTitle('')
              setDescription('')
              setGoal('')
              setMerchant('')
              if (navigate) void navigate('/app/')
            }}
          >
            Create order
          </Button>
        </RContent>
      </Content>
    </Page>
  )
}
const Content = style('div', 'flex-l')

const LContent = style('form', 'flex-grow-0 w-70-l mr4-l')

const RContent = style('div', 'flex-grow-0  w-30-l', { minWidth: 'max-content' })
