import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

import * as moment from "moment";
import * as styles from "../styles";

import { ReactComponent as TrashIcon } from "../images/trash-solid.svg";

const RunInstance = ({ data, onDelete }) => {
  const [hovering, setHovering] = useState(false);
  const formattedDate = moment(data.date);
  const distanceInKm = data.distance / 1000;
  const pace = paceInMinutesPerKm(data.seconds, distanceInKm).toFixed(2);
  return (
    <BackgroundCard
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <DataWrapper>
        <MobileHeadings>Distance</MobileHeadings>
        <Distance>
          {distanceInKm}
          <Span> km</Span>
        </Distance>
        <MobileHeadings>Time</MobileHeadings>
        <Time>{timeInMinutesAndSeconds(data.seconds)}</Time>
        <Pace>
          {pace} <PaceSpan>min/km</PaceSpan>
        </Pace>
        <MobileHeadings>Date</MobileHeadings>
        <RunDate>{formattedDate.format("DD MMM YYYY")}</RunDate>
        <ActionsWrapper hovering={hovering}>
          <TrashIcon onClick={() => deleteRun(data.id, onDelete)} />
        </ActionsWrapper>
      </DataWrapper>
    </BackgroundCard>
  );
};

export default RunInstance;

const deleteRun = (runId, onDelete) => {
  const path = `/v1/runs/${runId}.json`;
  axios
    .delete(path)
    .then(response => {
      toast.success("Run deleted.");
      onDelete();
    })
    .catch(err => {
      console.log(err);
      toast.error("Could not delete run, please try again later.");
    });
};

const timeInMinutesAndSeconds = timeInSeconds => {
  let seconds = timeInSeconds % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  const mins = (timeInSeconds - seconds) / 60;
  return `${mins} : ${seconds}`;
};

const paceInMinutesPerKm = (timeInSeconds, distance) => {
  timeInSeconds = timeInSeconds * 1.0;
  return timeInSeconds / distance / 60;
};

const BackgroundCard = styled.div`
  box-shadow: ${styles.boxShadow};
  position: relative;
  display: flex;
  align-items: center;
  width: 900px;
  max-height: 80px;
  min-height: 80px;
  margin-bottom: 15px;
  cursor: auto;

  @media (max-width: 420px) {
    width: 90%;
    max-height: none;
    padding: 15px 0px 20px;
  }
`;

const ActionsWrapper = styled.div`
  visibility: ${props => (props.hovering ? "visible" : "hidden")}
  cursor: pointer;
  width: 10%;
  display: flex;
  justify-content: right;

  svg {
    height: 20px;
    color: ${styles.textColor};

    &:hover {
      color: ${styles.dangerColor}
    }
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 0px 30px;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const Distance = styled.p`
  font-size: 36px;
  font-weight: bold;
  width: 20%;
  margin: 0px;

  @media (max-width: 420px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

const MobileHeadings = styled.p`
  display: none;

  @media (max-width: 420px) {
    display: block;
    font-size: 16px;
    font-weight: bold;
    margin-top: 2px;
    margin-bottom: 0px;
    text-transform: uppercase;
    color: #888;
  }
`;

const Time = styled.p`
  font-size: 28px;
  font-weight: bold;
  width: 20%;
  margin: 0px;
  text-align: left;

  @media (max-width: 420px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;

const Pace = styled.p`
  font-size: 28px;
  font-weight: bold;
  width: 25%;
  margin: 0px;

  @media (max-width: 420px) {
    width: 100%;
    display: none;
    margin-bottom: 5px;
  }
`;

const RunDate = styled.p`
  font-size: 22px;
  font-weight: bold;
  width: 25%;
  margin: 0px;

  @media (max-width: 420px) {
    width: 100%;
    text-align: left;
  }
`;

const Span = styled.span`
  @media (min-width: 420px) {
    font-size: 24px;
  }
`;

const PaceSpan = styled.span`
  display: none;
  @media (max-width: 420px) {
    display: inline-block;
    font-size: 16px;
    text-transform: uppercase;
  }
`;
