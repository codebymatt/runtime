import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import * as styles from "../styles";
import Signup from "./Signup";
import Login from "./Login";

const Landing = ({ history }) => {
  redirectToDashBoardIfLoggedIn(history);
  const [formType, setFormType] = useState("signup");

  let displayedForm =
    formType === "signup" ? (
      <SignupWrapper clickHandler={setFormType} />
    ) : (
      <LoginWrapper clickHandler={setFormType} />
    );
  return (
    <LandingWrapper>
      <Header>runtime</Header>
      <Kicker>Log your runs and track your progress with ease.</Kicker>
      {displayedForm}
    </LandingWrapper>
  );
};

const SignupWrapper = ({ clickHandler }) => {
  return (
    <>
      <Signup />
      <SwitchDisplayPrompt>
        Already have an account?
        <br />
        <SwitchDisplayLink onClick={() => clickHandler("login")}>
          Login here
        </SwitchDisplayLink>
      </SwitchDisplayPrompt>
    </>
  );
};

const LoginWrapper = ({ clickHandler }) => {
  return (
    <>
      <Login />
      <SwitchDisplayPrompt>
        Don't have an account yet?
        <br />
        <SwitchDisplayLink onClick={() => clickHandler("signup")}>
          Sign up here
        </SwitchDisplayLink>
      </SwitchDisplayPrompt>
    </>
  );
};

export default withRouter(Landing);

const redirectToDashBoardIfLoggedIn = history => {
  const userInfo = JSON.parse(localStorage.getItem("userState"));
  if (userInfo.loggedIn) {
    history.push("/dashboard");
  }
};
const LandingWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const Header = styled.h1`
  font-weight: bold;
  font-size: 48px;
`;

const Kicker = styled.div`
  margin: 50px auto;
  font-size: 28px;

  @media (max-width: 420px) {
    font-size: 22px;
    margin: 20px auto;
  }
`;

const SwitchDisplayPrompt = styled.div`
  margin-top: 60px;
  font-size: 18px;

  @media (max-width: 420px) {
    max-width: 90%;
    margin: 60px auto 45px;
  }
`;

const SwitchDisplayLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: ${styles.lightenedTextColor};
  }
`;
