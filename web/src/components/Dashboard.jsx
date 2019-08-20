import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";

import Header from "./Header";
import RunCreator from "./RunCreator";
import RunList from "./RunList";

const Dashboard = ({ history }) => {
  // redirectToLandingIfLoggedOut(history);
  const [runs, updateRunList] = useState([]);
  useEffect(() => {
    getRunData(updateRunList);
  }, []);
  const displayedComponent = chooseComponent(runs, () => {
    getRunData(updateRunList);
  });

  const userInfo = JSON.parse(localStorage.getItem("userState"));
  if (userInfo === null || !userInfo.loggedIn) {
    history.push("/");
    return null;
  }

  return (
    <>
      <Header currentPage="dashboard" />
      <RunCreator
        refreshRuns={() => {
          getRunData(updateRunList);
        }}
      />
      {displayedComponent}
    </>
  );
};

export default withRouter(Dashboard);

const getRunData = updateRunList => {
  axios
    .get("/v1/runs.json")
    .then(resp => {
      updateRunList(resp.data.runs);
    })
    .catch(err => {
      console.log(err);
      toast.error("Couldn't fetch run data at this time.");
    });
};

const chooseComponent = (runs, refreshRuns) => {
  if (runs.length === 0) {
    const userInfo = JSON.parse(localStorage.getItem("userState"));
    const name = userInfo.user === null ? "user" : userInfo.user.name;
    return (
      <RunPlaceholder>
        Hey {name}! You haven't logged any runs yet..
        <br /> Use the above form to get started!
      </RunPlaceholder>
    );
  } else {
    return <RunList runList={runs} refreshRuns={refreshRuns} />;
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
