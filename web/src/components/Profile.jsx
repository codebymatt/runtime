import React from "react";
import styled from "styled-components";

import Header from "./Header";
import TextInput from "./shared/TextInput";
import { ActionButton, DangerButton } from "./shared/Buttons";

const Profile = () => {
  return (
    <>
      <Header currentPage="profile" />
      <ProfileWrapper>
        <ProfileImageWrapper>
          <ProfileImagePlaceholder className="fas fa-user-circle" />
        </ProfileImageWrapper>
        <InfoWrapper>
          <InputsWrapper>
            <TextInput title="Name" placeholder="Michael Scott" />
            <TextInput
              title="Email"
              type="email"
              placeholder="mgscott@dundermifflin.com"
            />
            <ButtonsWrapper>
              <ActionButton
                text="Save"
                inactive={true}
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

export default Profile;

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
