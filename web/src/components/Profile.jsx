import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import TextInput from "./shared/TextInput";
import { ActionButton, DangerButton } from "./shared/Buttons";

const Profile = ({ history }) => {
  redirectToLandingIfLoggedOut(history);
  const userInfo = JSON.parse(localStorage.getItem("userState")).user;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (name === userInfo.name && email === userInfo.email) {
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
          <ProfileImagePlaceholder className="fas fa-user-circle" />
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
              <ActionButton
                text="Save"
                inactive={!editing}
                clickHandler={() => {}}
              />
              <DangerButton text="Delete" clickHandler={() => {}} />
            </ButtonsWrapper>
          </InputsWrapper>
        </InfoWrapper>
      </ProfileWrapper>
    </>
  );
};

export default withRouter(Profile);

const redirectToLandingIfLoggedOut = history => {
  const userInfo = JSON.parse(localStorage.getItem("userState"));
  if (!userInfo.loggedIn) {
    history.push("/");
  }
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImageWrapper = styled.div`
  margin: 50px auto 0px;
  height: 150px;
  width: 150px;
`;

const ProfileImagePlaceholder = styled.i`
  font-size: 128px;
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
