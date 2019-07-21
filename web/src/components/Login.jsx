import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import TextInput from "./shared/TextInput";
import { ActionButton } from "./shared/Buttons";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <InputForm>
      <InputWrapper>
        <TextInput
          title="Email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />
        <TextInput
          type="password"
          title="Password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
      </InputWrapper>
      <ActionButton
        text="Login"
        clickHandler={event => {
          event.preventDefault();
          authenticateAndRedirect(history, email, password);
        }}
      />
    </InputForm>
  );
};

export default withRouter(Login);

const authenticateAndRedirect = (history, email, password) => {
  axios
    .post("/v1/login.json", {
      credentials: {
        email: email,
        password: password
      }
    })
    .then(response => {
      persistUserInfoToLocalStorage(response.data.user);
      history.push("/dashboard");
    })
    .catch(err => {
      const resp = err.response;
      if (resp.status === 401) {
        toast.error("Invalid username or password! Please try again.");
      } else {
        toast.error(
          "Something went wrong on our side.. Please try again later!"
        );
      }
    });
};

const persistUserInfoToLocalStorage = user => {
  localStorage.setItem(
    "userState",
    JSON.stringify({
      user: user,
      loggedIn: true
    })
  );
};

const InputForm = styled.form``;

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
