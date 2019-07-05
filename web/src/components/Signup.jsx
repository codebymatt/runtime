import React from "react";
import styled from "styled-components";
import TextInput from "./shared/TextInput";
import { ActionButton } from "./shared/ActionButton";

const Signup = () => {
  return (
    <>
      <InputWrapper>
        <TextInput title="Name" placeholder="Michael Scott" />
        <TextInput title="Email" placeholder="mgscott@dundermifflin.com" />
        <PasswordWrapper>
          <TextInput size="small" title="Password" type="password" />
          <TextInput size="small" title="Confirm Password" type="password" />
        </PasswordWrapper>
      </InputWrapper>
      <ActionButton text="Sign Up" />
    </>
  );
};

export default Signup;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto 30px;
  width: 450px;

  @media (max-width: 420px) {
    width: 90%;
  }
`;

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 450px;

  @media (max-width: 420px) {
    flex-direction: column;
    width: 100%;
  }
`;
