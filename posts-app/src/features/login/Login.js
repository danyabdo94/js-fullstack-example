import React from 'react'
import { useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import { useHistory } from 'react-router-dom';
import { Button, Container, Input, Spinner } from "../../atoms"
import { ReactComponent as LoginIcon } from "../../icons/login.svg"
import { ReactComponent as ForgetIcon } from "../../icons/forget-password.svg"

import * as schemas from "./schemas"

export function Login() {
  const loginButton = "transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block";
  const forgetButton = "transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
  const history = useHistory();
  const [login, { loading }] = useMutation(schemas.LOGIN, {
    onError: error => {
      console.log(error)
    },
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token)
      history.push('/posts')
    }
  })

  return (
    <Container logo={true}>
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div className="px-5 py-7">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={async (values) => {
              await login({ variables: values })
            }}
          >
            <Form>
              <Input name="email" label="E-mail" type="email" required={true} />
              <Input name="password" label="Password" type="password" required={true} />
              <Button classes={loginButton} type="submit" title="Login" >
                <LoginIcon />
              </Button>
              {loading && <Spinner />}
            </Form>
          </Formik>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <Button type="button" classes={forgetButton} title="Forgot Password" >
                <ForgetIcon />
              </Button>
            </div>
            <div className="text-center sm:text-right whitespace-nowrap">
              <Button type="button" classes={forgetButton} title="Signup" >
                <LoginIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
