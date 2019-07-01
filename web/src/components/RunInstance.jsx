import React from "react";
import styled from "styled-components";

import * as moment from "moment";
import * as styles from "../styles";

const RunInstance = ({ data }) => {
  const formattedDate = moment(data.date);
  const pace = paceInMinutesPerKm(data.seconds, data.distance).toFixed(2);
  return (
    <BackgroundCard>
      <DataWrapper>
        <MobileHeadings>Distance</MobileHeadings>
        <Distance>
          {data.distance}
          <Span> km</Span>
        </Distance>
        <MobileHeadings>Time</MobileHeadings>
        <Time>{timeInMinutesAndSeconds(data.seconds)}</Time>
        <Pace>
          {pace} <PaceSpan>min/km</PaceSpan>
        </Pace>
        <MobileHeadings>Date</MobileHeadings>
        <RunDate>{formattedDate.format("DD MMM YYYY")}</RunDate>
      </DataWrapper>
    </BackgroundCard>
  );
};

export default RunInstance;

const timeInMinutesAndSeconds = timeInSeconds => {
  const seconds = timeInSeconds % 60;
  const mins = (timeInSeconds - seconds) / 60;
  return `${mins} : ${seconds}`;
};

const paceInMinutesPerKm = (timeInSeconds, distance) => {
  timeInSeconds = timeInSeconds * 1.0;
  return timeInSeconds / distance / 60;
};

const BackgroundCard = styled.div`
  box-shadow: ${styles.boxShadow};
  display: flex;
  align-items: center;
  width: 900px;
  max-height: 80px;
  min-height: 80px;
  margin-bottom: 15px;

  @media (max-width: 420px) {
    width: 90%;
    max-height: none;
    padding: 15px 0px 20px;
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
  width: 20%;
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
  width: 40%;
  text-align: right;
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
