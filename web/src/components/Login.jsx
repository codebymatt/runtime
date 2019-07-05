import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import TextInput from "./shared/TextInput";
import { ActionButton } from "./shared/Buttons";

const Login = ({ history }) => {
  return (
    <>
      <InputWrapper>
        <TextInput title="Email" />
        <TextInput type="password" title="Password" />
      </InputWrapper>
      <ActionButton
        text="Login"
        clickHandler={() => authenticateAndRedirect(history)}
      />
    </>
  );
};

export default withRouter(Login);

const authenticateAndRedirect = history => {
  history.push("/dashboard");
};

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
