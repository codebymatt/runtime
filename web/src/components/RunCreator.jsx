import React from "react";
import styled from "styled-components";

import * as styles from "../styles";
import ActionButton from "./shared/ActionButton";

const RunCreator = () => {
  return (
    <BackgroundCard>
      <InputContainer>
        <DistanceInputContainer />
        <TimeWrapper>
          <MinutesInput />
          <TimeColon>
            <i class="fas fa-circle" />
            <i class="fas fa-circle" />
          </TimeColon>
          <SecondsInput />
        </TimeWrapper>
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
`;

const DistanceInputContainer = () => {
  return (
    <DistanceContainer>
      <InputTitle>Distance</InputTitle>
      <InputWrapper>
        <DistanceInput placeholder="5.5" />
        <DistanceMetric>km</DistanceMetric>
      </InputWrapper>
    </DistanceContainer>
  );
};

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  margin-left: 50px;
`;

const MinutesInput = () => {
  return (
    <MinutesContainer>
      <InputTitle>Minutes</InputTitle>
      <InputWrapper>
        <TimeInput placeholder="21" />
      </InputWrapper>
    </MinutesContainer>
  );
};

const SecondsInput = () => {
  return (
    <MinutesContainer>
      <InputTitle>Seconds</InputTitle>
      <InputWrapper>
        <TimeInput placeholder="57" />
      </InputWrapper>
    </MinutesContainer>
  );
};

const DistanceContainer = styled.div`
  // margin-left: 20px;
`;

const MinutesContainer = styled.div``;

const InputTitle = styled.h5`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  margin: 0px auto 6px;
  text-align: right;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const DistanceInput = styled.input`
  height: 45px;
  width: 120px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  padding-right: 35px;
  box-shadow: ${styles.boxShadow};
`;

const TimeInput = styled.input`
  height: 45px;
  width: 90px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  padding-right: 20px;
  box-shadow: ${styles.boxShadow};
`;

const TimeColon = styled.div`
  font-size: 6px;
  margin: 40px 7px 0px 7px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 20px;
  color: ${styles.lightenedTextColor};
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
`;
