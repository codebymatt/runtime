import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import RunCreator from "./RunCreator";
// import RunList from "./RunList";

const Dashboard = ({ history }) => {
  redirectToLandingIfLoggedOut(history);
  return (
    <>
      <Header currentPage="dashboard" />
      <RunCreator />
      <RunPlaceholder>
        You haven't logged any runs yet! Add one using the above form to get
        started.
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
`;
