import React from "react";
import styled from "styled-components";

import * as styles from "../styles";
import { ActionButton } from "./shared/ActionButton";
import TimeInputs from "./TimeInputs";
import RunInputTitle from "./shared/RunInputTitle";

const RunCreator = () => {
  return (
    <BackgroundCard>
      <InputContainer>
        <DistanceInputContainer />
        <TimeInputs />
      </InputContainer>
      <ActionButton text="Add Run" clickHandler={() => {}} />
    </BackgroundCard>
  );
};

export default RunCreator;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  height: 100%;

  @media (max-width: 420px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const DistanceInputContainer = () => {
  return (
    <DistanceContainer>
      <RunInputTitle>Distance</RunInputTitle>
      <InputWrapper>
        <DistanceInput placeholder="5.5" />
        <DistanceMetric>km</DistanceMetric>
      </InputWrapper>
    </DistanceContainer>
  );
};

const DistanceContainer = styled.div``;

const InputWrapper = styled.div`
  position: relative;
  width: auto;
  display: inline-block;
`;

const DistanceInput = styled.input`
  height: 45px;
  width: 120px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  padding-right: 40px;
  box-shadow: ${styles.boxShadow};
  border-style: none;
  -webkit-appearance: none;
  border-radius: 0px;
`;

const DistanceMetric = styled.p`
  margin-top: 0px;
  position: absolute;
  top: 12.5px;
  right: 10px;
  color: ${styles.lightenedTextColor};
`;

const BackgroundCard = styled.div`
  margin: 45px auto 0px;
  height: 120px;
  width: 900px;
  padding: 0px 30px;
  box-shadow: ${styles.boxShadow};
  display: flex
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 420px) {
    flex-direction: column;
    width: 90%;
    height: auto;
    align-items: flex-start;
    padding: 10px 5px 30px 30px;
  }
`;
