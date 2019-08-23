import React, { useState } from "react";
import styled from "styled-components";

import * as styles from "../styles";
import { ActionButton } from "./shared/Buttons";
import TimeInputs from "./TimeInputs";
import RunInputTitle from "./shared/RunInputTitle";
import axios from "axios";
import { toast } from "react-toastify";

const RunCreator = ({ refreshRuns }) => {
  const [distance, setDistance] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const clearInputs = () => {
    setDistance("");
    setMinutes("");
    setSeconds("");
  };

  return (
    <BackgroundCard>
      <InputContainer>
        <DistanceInputContainer distance={distance} setDistance={setDistance} />
        <TimeInputs
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
        />
      </InputContainer>
      <ActionButton
        text="Add Run"
        clickHandler={event => {
          event.preventDefault();
          createRun(distance, minutes, seconds, refreshRuns, clearInputs);
        }}
      />
    </BackgroundCard>
  );
};

export default RunCreator;

const createRun = (distance, minutes, seconds, refreshRuns, clearInputs) => {
  if (distance <= 0) {
    toast.warn("Distance field must be filled out!");
    return;
  }
  distance = distance * 1000;
  axios
    .post("/v1/runs.json", {
      run_data: { distance: distance, minutes: minutes, seconds: seconds }
    })
    .then(() => {
      refreshRuns();
      clearInputs();
      toast.success("Run has been logged.");
    })
    .catch(() => {
      toast.error("Couldn't log run, make sure all your inputs are valid.");
    });
};

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

const DistanceInputContainer = ({ distance, setDistance }) => {
  return (
    <DistanceContainer>
      <RunInputTitle>Distance</RunInputTitle>
      <InputWrapper>
        <DistanceInput
          placeholder={distance}
          onChange={event => setDistance(event.target.value)}
          type="number"
          value={distance}
        />
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
  -webkit-appearance: textfield;
  border-radius: 0px;

  @media (max-width: 420px) {
    -webkit-appearance: none;
  }
`;

const DistanceMetric = styled.p`
  margin-top: 0px;
  position: absolute;
  top: 12.5px;
  right: 10px;
  color: ${styles.lightenedTextColor};
`;

const BackgroundCard = styled.form`
  margin: 45px auto 0px;
  height: 120px;
  width: 900px;
  padding: 0px 30px;
  box-shadow: ${styles.boxShadow};
  display: flex
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 420px) {
    flex-direction: column;
    width: 90%;
    height: auto;
    align-items: flex-start;
    padding: 10px 5px 30px 30px;
  }
`;
