import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";

function App() {
  return (
    <AppContainer>
      <Router>
        <Route exact path="/" component={Landing} />
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

export default App;
