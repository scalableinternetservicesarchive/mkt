import { useMutation } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { CreateUser } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { PictureUpload } from '../components/PictureUpload'
import { Page } from '../page/Page'
import { toastErr } from '../toast/toast'
import { CREATE_USER } from './fetchUser'
import { validate } from './Login'

export function SignUp({ navigate }: RouteComponentProps) {
  const [createUser] = useMutation<CreateUser>(CREATE_USER)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [picture, setPicture] = useState('')
  const [err, setError] = useState({ email: false, password: false })

  async function signup() {
    if (!validate(email, 'e', setError)) {
      toastErr('invalid email')
      return
    }

    createUser({
      variables: {
        input: {
          name,
          email,
          picture,
        },
      },
    })
      .then(() => {
        if (navigate) void navigate('/app/login')
      })
      .catch(err => {
        toastErr(err.toString())
        setError({ email: true, password: true })
      })
  }

  return (
    <Page>
      <PictureUpload onUpload={setPicture} />
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="name">
          Name
        </label>
        <Input $onChange={setName} $onSubmit={signup} name="name" type="text" />
        <label className="db fw4 lh-copy f6" htmlFor="email">
          Email address
        </label>
        <Input $hasError={err.email} $onChange={setEmail} $onSubmit={signup} name="email" type="email" />
      </div>
      <div className="mt3">
        <Button onClick={signup}>Log in</Button>
      </div>
    </Page>
  )
}
