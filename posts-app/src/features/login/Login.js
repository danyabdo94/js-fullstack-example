import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Container, Input } from "../../atoms"
import { ReactComponent as LoginIcon } from "../../icons/login.svg";
import { ReactComponent as ForgetIcon } from "../../icons/forget-password.svg";

export function Login() {
  const loginButton = "transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block";
  const forgetButton = "transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
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
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <Input name="email" label="E-mail" type="email" />
              <Input name="password" label="Password" type="password" />
              <Button classes={loginButton} type="submit" title="Login" >
                <LoginIcon />
              </Button>
            </Form>
          </Formik>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <Button classes={forgetButton} title="Forgot Password" >
                <ForgetIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
