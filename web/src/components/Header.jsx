import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import * as styles from "../styles";
// import axios from "axios";
// import { toast } from "react-toastify";

import { ReactComponent as Runner } from "../images/running-solid.svg";
import { ReactComponent as SignOut } from "../images/sign-out-alt-solid.svg";
import { ReactComponent as UserIcon } from "../images/user-circle-solid.svg";
import { logout } from "./shared/authentication";

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
            <ImageWrapper>
              <Runner />
            </ImageWrapper>
          </NavItem>
        )}
        {currentPage !== "profile" && (
          <NavItem
            onClick={() => {
              history.push("/profile");
            }}
          >
            <ImageWrapper>
              <UserIcon />
            </ImageWrapper>
          </NavItem>
        )}
        <NavItem onClick={() => logout(history)}>
          <ImageWrapper>
            <SignOut />
          </ImageWrapper>
        </NavItem>
      </NavBar>
    </HeaderWrapper>
  );
};

export default withRouter(Header);

// const logout = history => {
//   axios
//     .post("/v1/logout.json")
//     .then(() => {
//       removeUserInfoFromLocalStorage();
//       history.push("/");
//     })
//     .catch(() => {
//       toast.error(
//         "Could not log you out! Something has gone wrong on our end.."
//       );
//     });
// };

// const removeUserInfoFromLocalStorage = () => {
//   localStorage.setItem(
//     "userState",
//     JSON.stringify({
//       user: null,
//       loggedIn: false
//     })
//   );
// };

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

const ImageWrapper = styled.div`
  height: 25px;

  svg {
    height: 100%;
  }
`;
