import React from 'react';
import Button from "../../atoms/button"
import Container from '../../atoms/container';
import Input from '../../atoms/input';
import { ReactComponent as SignupIcon } from "../../icons/login.svg";

export function Signup() {
  const signupButton = "transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block";
  return (
    <Container logo={true}>
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div className="px-5 py-7">
          <Input name="Full Name" />
          <Input name="E-mail" />
          <Input name="Password" />
          <Input name="Re-Password" />
          <Button classes={signupButton} title="Signup" >
            <SignupIcon />
          </Button>
        </div>
      </div>
    </Container>
  );
}
