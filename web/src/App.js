import React from "react";
import axios from "axios";
import styled from "styled-components";
import { toast, Flip } from "react-toastify";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import "react-toastify/dist/ReactToastify.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

toast.configure({
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: true,
  transition: Flip,
  closeButton: false
});

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.data.reason === "unauthorized_request") {
      setEmptyUserState();
      window.location.pathname = "/";
    }
    return Promise.reject(error);
  }
);

const setEmptyUserState = () => {
  localStorage.setItem("userState", JSON.stringify(initialUserState));
};

const initialUserState = {
  user: null,
  loggedIn: false
};

function App() {
  if (!localStorage.getItem("userState")) {
    setEmptyUserState();
  }

  return (
    <AppContainer>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route path="/dashboard/" component={Dashboard} />
          <Route path="/profile/" component={Profile} />
        </Router>
      </MuiPickersUtilsProvider>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

export default App;
