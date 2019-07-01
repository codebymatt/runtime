import React from "react";
import styled from "styled-components";

import * as styles from "../styles";
import RunInputTitle from "./shared/RunInputTitle";

const TimeInputs = () => {
  return (
    <TimeWrapper>
      <MinutesInput />
      <TimeColon>
        <i className="fas fa-circle" />
        <i className="fas fa-circle" />
      </TimeColon>
      <SecondsInput />
    </TimeWrapper>
  );
};

export default TimeInputs;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  margin-left: 50px;

  @media (max-width: 420px) {
    margin 20px 0px 20px 0px;
  }
`;

const MinutesInput = () => {
  return (
    <MinutesContainer>
      <RunInputTitle>Minutes</RunInputTitle>
      <>
        <TimeInput placeholder="21" />
      </>
    </MinutesContainer>
  );
};

const SecondsInput = () => {
  return (
    <MinutesContainer>
      <RunInputTitle>Seconds</RunInputTitle>
      <>
        <TimeInput placeholder="57" />
      </>
    </MinutesContainer>
  );
};

const MinutesContainer = styled.div``;

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

const TimeInput = styled.input`
  height: 45px;
  width: 90px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  padding-right: 20px;
  box-shadow: ${styles.boxShadow};
  border-style: none;
  -webkit-appearance: none;
  border-radius: 0px;
`;
