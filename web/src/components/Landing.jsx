import React from "react";
import styled from "styled-components";
import * as styles from "../styles";
import Signup from "./Signup";

const Landing = () => {
  return (
    <LandingWrapper>
      <Header>runtime</Header>
      <Kicker>Log your runs and track your progress with ease.</Kicker>
      <Signup />
      <LoginPrompt>
        Already have an account? <LoginLink>Login here.</LoginLink>
      </LoginPrompt>
    </LandingWrapper>
  );
};

export default Landing;

const LandingWrapper = styled.div`
  text-align: center;
`;

const Header = styled.h1`
  font-weight: bold;
  font-size: 48px;
`;

const Kicker = styled.div`
  margin: 50px auto;
  font-size: 28px;
`;

const LoginPrompt = styled.div`
  margin-top: 60px;
  font-size: 20px;
`;

const LoginLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: ${styles.lightenedTextColor};
  }
`;
