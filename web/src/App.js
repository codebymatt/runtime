import React from "react";
import axios from "axios";
import styled from "styled-components";
import { toast, Flip } from "react-toastify";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  position: "bottom-center",
  autoClose: 4000,
  hideProgressBar: true,
  transition: Flip,
  closeButton: false
});

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const initialUserState = {
  user: null,
  loggedIn: false
};

function App() {
  if (!localStorage.getItem("userState")) {
    localStorage.setItem("userState", JSON.stringify(initialUserState));
  }

  return (
    <AppContainer>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route path="/profile/" component={Profile} />
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

export default App;
