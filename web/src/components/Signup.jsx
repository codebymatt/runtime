import React from "react";
import styled from "styled-components";
import TextInput from "./shared/TextInput";
import ActionButton from "./shared/ActionButton";

const Signup = () => {
  return (
    <>
      <InputWrapper>
        <TextInput title="Name" placeholder="Dwight Schrute" />
        <TextInput title="Email" placeholder="dwight@schrutebeetfarms.com" />
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
`;

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 450px;
`;
