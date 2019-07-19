import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import TextInput from "./shared/TextInput";
import { ActionButton } from "./shared/Buttons";
import { toast } from "react-toastify";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  return (
    <>
      <InputWrapper>
        <TextInput
          title="Name"
          placeholder="Michael Scott"
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
        />
        <TextInput
          title="Email"
          placeholder="mgscott@dundermifflin.com"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <PasswordWrapper>
          <TextInput
            size="small"
            title="Password"
            type="password"
            value={password}
            onChange={event => {
              setPassword(event.target.value);
            }}
          />
          <TextInput
            size="small"
            title="Confirm Password"
            type="password"
            value={passwordConfirmation}
            onChange={event => {
              setPasswordConfirmation(event.target.value);
            }}
          />
        </PasswordWrapper>
      </InputWrapper>
      <ActionButton
        text="Sign Up"
        clickHandler={() =>
          createUser(history, name, email, password, passwordConfirmation)
        }
      />
    </>
  );
};

export default withRouter(Signup);

const createUser = (history, name, email, password, passwordConfirmation) => {
  console.log(name);
  axios
    .post("/v1/user.json", {
      user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    })
    .then(response => {
      persistUserInfoToLocalStorage(response.data.user);
      history.push("/dashboard");
    })
    .catch(err => {
      const resp = err.response;
      if (resp.status === 401) {
        toast.error("Invalid input! Please try again.");
      } else {
        toast.error(
          "There's something wrong on our side.. Please try again later!"
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
