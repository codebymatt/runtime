import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import * as styles from "../styles";

const Header = ({ history, currentPage }) => {
  return (
    <HeaderWrapper>
      <Title
        onClick={() => {
          history.push("/dashboard");
        }}
      >
        runtime
      </Title>
      <NavBar>
        {currentPage !== "dashboard" && (
          <NavItem
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <i className="fas fa-running" />
          </NavItem>
        )}
        {currentPage !== "profile" && (
          <NavItem
            onClick={() => {
              history.push("/profile");
            }}
          >
            <i className="fas fa-user-circle" />
          </NavItem>
        )}
        <NavItem onClick={() => logout(history)}>
          <i className="fas fa-sign-out-alt" />
        </NavItem>
      </NavBar>
    </HeaderWrapper>
  );
};

export default withRouter(Header);

const logout = history => {
  history.push("/");
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 30px auto 0px;

  @media (max-width: 420px) {
    margin-top: 10px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 48px;
  margin-left: 20px;
  cursor: pointer;

  @media (max-width: 420px) {
    font-size: 42px;
  }
`;

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const NavItem = styled.div`
  font-size: 25px;
  margin-left: 15px;
  cursor: pointer;
  color: ${styles.textColor};

  &:hover {
    color: ${styles.primaryColor};
  }

  @media (max-width: 420px) {
    margin-top: 5px;
  }
`;
