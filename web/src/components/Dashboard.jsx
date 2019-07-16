import React from "react";
import Header from "./Header";
import RunCreator from "./RunCreator";
import RunList from "./RunList";

const Dashboard = () => {
  return (
    <>
      <Header currentPage="dashboard" />
      <RunCreator />
      <RunList />
    </>
  );
};

export default Dashboard;
