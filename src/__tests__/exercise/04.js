// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'

import Login from '../../components/login'

const buildLoginForm = build({
  fields: {
    userName: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // let submittedData
  const handleSubmit = jest.fn()
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  // 🐨 get the username and password fields via `getByLabelText`
  const {userName, password} = buildLoginForm()
  // 🐨 use `await userEvent.type...` to change the username and password fields to

  await userEvent.type(screen.getByLabelText(/username/i), userName)
  await userEvent.type(screen.getByLableText(/password/i), password)

  // 🐨 click on the button with the text "Submit"
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  expect(handleSubmit).toHaveBeenCalledWith({
    userName,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
