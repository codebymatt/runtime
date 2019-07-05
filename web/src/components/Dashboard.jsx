import React from "react";
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
