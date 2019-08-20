import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import UserIcon from "@material-ui/icons/AccountCircle";

import Header from "./Header";
import TextInput from "./shared/TextInput";
import { ActionButton, DangerButton, ConfirmButton } from "./shared/Buttons";
import { toast } from "react-toastify";
import { logout } from "./shared/authentication";

const Profile = ({ history }) => {
  let originalName = "";
  let originalEmail = "";

  const [name, setName] = useState(originalName);
  const [email, setEmail] = useState(originalEmail);

  const userInfo = JSON.parse(localStorage.getItem("userState")).user;

  if (userInfo === null || !userInfo.loggedIn) {
    history.push("/");
  } else {
    let { name: originalName, email: originalEmail } = userInfo;
    setName(originalName);
    setEmail(originalEmail);
  }

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (
      userInfo !== null &&
      name === userInfo.name &&
      email === userInfo.email
    ) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  }, [name, email, userInfo]);

  return (
    <>
      <Header currentPage="profile" />
      <ProfileWrapper>
        <ProfileImageWrapper>
          <UserIcon />
        </ProfileImageWrapper>
        <InfoWrapper>
          <InputsWrapper>
            <TextInput
              title="Name"
              value={name}
              placeholder="Michael Scott"
              onChange={event => setName(event.target.value)}
            />
            <TextInput
              title="Email"
              value={email}
              type="email"
              placeholder="mgscott@dundermifflin.com"
              onChange={event => setEmail(event.target.value)}
            />
            <ButtonsWrapper>
              <ConfirmButton
                text="Save"
                inactive={!editing}
                clickHandler={() => {
                  updateUserInfo(name, email, setName, setEmail, setEditing);
                }}
              />
              <ActionButton
                text="Cancel"
                visible={editing}
                clickHandler={() => {
                  setName(originalName);
                  setEmail(originalEmail);
                }}
              />
              <DangerButton
                text="Delete"
                visible={!editing}
                clickHandler={() => {
                  deleteUser(history);
                }}
              />
            </ButtonsWrapper>
          </InputsWrapper>
        </InfoWrapper>
      </ProfileWrapper>
    </>
  );
};

export default withRouter(Profile);

// const redirectToLandingIfLoggedOut = history => {
//   const userInfo = JSON.parse(localStorage.getItem("userState"));
//   if (userInfo === null || !userInfo.loggedIn) {
//     window.location.href = "/";
//     // history.push("/");
//   }
// };

const updateUserInfo = (name, email, setName, setEmail, setEditing) => {
  if (name === "" || email === "") {
    toast.error("You've left an important field blank!");
  } else {
    axios
      .put("/v1/user.json", {
        user: {
          name: name,
          email: email
        }
      })
      .then(response => {
        toast.success("Profile successfully updated.");
        setUpdatedUserInfo(response.data.user, setName, setEmail, setEditing);
      })
      .catch(() => {
        toast.error(
          "Could not update your profile info! Please try again later."
        );
      });
  }
};

const deleteUser = history => {
  axios
    .delete("/v1/user.json")
    .then(() => {
      logout(history);
      toast.success("User successfully deleted");
    })
    .catch(() => {
      toast.error(
        "Could not delete user, either try again or contact support!"
      );
    });
};

const setUpdatedUserInfo = (user, setName, setEmail, setEditing) => {
  localStorage.setItem(
    "userState",
    JSON.stringify({ user: user, loggedIn: true })
  );
  setName(user.name);
  setEmail(user.email);
  setEditing(false);
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImageWrapper = styled.div`
  margin: 50px auto 0px;
  height: 150px;
  width: 150px;

  svg {
    height: 100%;
    width: 100%;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 320px) {
    width: 90%;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-width: 300px;
`;

const ButtonsWrapper = styled.div`
  margin: 30px auto 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 330px;

  @media (max-width: 320px) {
    width: 150px;
    height: 100px;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 30px;
  }
`;
