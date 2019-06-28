import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <AppContainer>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard/" component={Dashboard} />
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

export default App;
