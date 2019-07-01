import React from "react";
import styled from "styled-components";
import RunInstance from "./RunInstance";

const RunList = () => {
  return (
    <ComponentWrapper>
      <HeadingsWrapper>
        <Heading name="Distance" width={"20%"} />
        <Heading name="Time" width={"20%"} />
        <Heading name="Pace per km" width={"20%"} />
        <Heading name="Date" width={"40%"} textAlign="right" />
      </HeadingsWrapper>
      <MobileTitle>Your Runs</MobileTitle>
      <RunWrapper>
        {runData.map(run => {
          return <RunInstance data={run} key={run.id} />;
        })}
      </RunWrapper>
    </ComponentWrapper>
  );
};

export default RunList;

const Heading = ({ width, name, textAlign }) => {
  return (
    <HeadingText width={width} textAlign={textAlign}>
      {name}
    </HeadingText>
  );
};

const ComponentWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 45px;
  width: 900px;

  @media (max-width: 420px) {
    width: 100%;
    margin-top: 25px;
  }
`;

const HeadingsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0px 25px;
  margin-bottom: 10px;

  @media (max-width: 420px) {
    display: none;
  }
`;

const MobileTitle = styled.h1`
  width: 90%;
  font-size: 36px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 15px;
  padding-left: 30px;

  @media (min-width: 420px) {
    display: none;
  }
`;

const HeadingText = styled.p`
  text-transform: uppercase;
  width: ${props => props.width};
  text-align: ${props => (props.textAlign === "right" ? "right" : "left")};
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 0px;
`;

const RunWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 420px) {
    width: 100%;
  }
`;

const runData = [
  { id: 0, distance: 5.5, seconds: 1317, date: new Date("June 30, 2019") },
  { id: 1, distance: 3.6, seconds: 870, date: new Date("June 28, 2019") },
  { id: 2, distance: 5.5, seconds: 1357, date: new Date("June 21, 2019") },
  { id: 3, distance: 5.5, seconds: 1344, date: new Date("June 17, 2019") },
  { id: 4, distance: 7.5, seconds: 2110, date: new Date("June 11, 2019") }
];
