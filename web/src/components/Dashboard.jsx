import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import RunCreator from "./RunCreator";
// import RunList from "./RunList";

const Dashboard = ({ history }) => {
  const name = JSON.parse(localStorage.getItem("userState")).user.name;
  redirectToLandingIfLoggedOut(history);
  return (
    <>
      <Header currentPage="dashboard" />
      <RunCreator />
      <RunPlaceholder>
        Hey {name}! You haven't logged any runs yet..
        <br /> Use the above form to get started!
      </RunPlaceholder>
      {/* <RunList /> */}
    </>
  );
};

export default withRouter(Dashboard);

const redirectToLandingIfLoggedOut = history => {
  const userInfo = JSON.parse(localStorage.getItem("userState"));
  if (!userInfo.loggedIn) {
    history.push("/");
  }
};

const RunPlaceholder = styled.h1`
  max-width: 90%;
  margin: 50px auto 20px;
  text-align: center;
  font-size: 20px;

  br {
    margin-bottom: 5px;
  }

  @media (max-width: 420px) {
    br {
      display: none;
    }
  }
`;
