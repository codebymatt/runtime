import React from "react";
import styled from "styled-components";

import Header from "./Header";
import TextInput from "./shared/TextInput";
import ActionButton from "./shared/ActionButton";

const Profile = () => {
  return (
    <>
      <Header />
      <ProfileWrapper>
        <ProfileImageWrapper>
          <InfoWrapper>
            <InputsWrapper>
              <TextInput name="Name" placeholder="Michael Scott" />
              <TextInput
                name="Email"
                type="email"
                placeholder="mgscott@dundermifflin.com"
              />
              <ButtonsWrapper>
                <ActionButton text="Edit" clickHandler={() => {}} />
                <ActionButton text="Delete" clickHandler={() => {}} />
              </ButtonsWrapper>
            </InputsWrapper>
          </InfoWrapper>
        </ProfileImageWrapper>
      </ProfileWrapper>
      ;
    </>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImageWrapper = styled.div`
  margin: 0 auto;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const InfoWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  // margin: 0 auto;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
