import React from "react";
import styled from "styled-components";
import Header from "./Header";
import RunCreator from "./RunCreator";
import RunList from "./RunList";

const Dashboard = () => {
  return (
    <>
      <Header />
      <RunCreator />
      <RunList />
    </>
  );
};

export default Dashboard;
