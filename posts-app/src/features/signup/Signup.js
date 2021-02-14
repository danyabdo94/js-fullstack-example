import React from 'react';
import { Button, Container, Input } from "../../atoms"
import { ReactComponent as SignupIcon } from "../../icons/login.svg";
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import * as schemas from "./schemas"
import Spinner from '../../atoms/spinner';

export function Signup() {
  const signupButton = "transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block";
  const history = useHistory();

  const validateConfirmPassword = (pass, value) => {
    let error = "";
    if (pass && value) {
      if (pass !== value) {
        error = "Password not matched";
      }
    }
    return error;
  };
  const [signup, { loading }] = useMutation(schemas.SIGNUP, {
    onError: error => {
      console.log(error)
    },
    onCompleted: (data) => {
      history.push('/login')
    }
  })
  return (
    <Container logo={true}>
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div className="px-5 py-7">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={async (values) => {
              await signup({ variables: values })
            }}
          >
            {({ values,errors }) => (
              <Form>
                <Input name="name" label="Name" type="text" required={true} />
                <Input name="email" label="E-mail" type="email" required={true} />
                <Input name="password" label="Password" type="password" required={true} />
                <Input name="confirmPassword" label="Confirm Password" type="password" required={true}
                  validate={value =>
                    validateConfirmPassword(values.password, value)
                  } />
                {errors.confirmPassword && <div className="text-sm text-red-500 mb-2">{errors.confirmPassword}</div>}

                <Button classes={signupButton} title="Signup" >
                  <SignupIcon />
                </Button>
                {loading && <Spinner />}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container >
  );
}
