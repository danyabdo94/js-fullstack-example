import React from 'react';
import { Button, Container, Input } from "../../atoms"
import { ReactComponent as SignupIcon } from "../../icons/login.svg";
import { Formik, Form } from 'formik';

export function Signup() {
  const signupButton = "transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block";
  return (
    <Container logo={true}>
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div className="px-5 py-7">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              repassword: "",
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <Input name="name" label="Name" type="text" required={true} />
              <Input name="email" label="E-mail" type="email" required={true} />
              <Input name="password" label="Password" type="password" required={true} />
              <Input name="repassword" label="Re-Password" type="password" required={true} />
              <Button classes={signupButton} title="Signup" >
                <SignupIcon />
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </Container >
  );
}
