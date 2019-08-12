import React from "react";
import styled from "styled-components";
import RunInstance from "./RunInstance";

const RunList = ({ runList, refreshRuns }) => {
  return (
    <ComponentWrapper>
      <HeadingsWrapper>
        <Heading name="Distance" width={"20%"} />
        <Heading name="Time" width={"20%"} />
        <Heading name="Minutes per km" width={"25%"} />
        <Heading name="Date" width={"25%"} />
      </HeadingsWrapper>
      <MobileTitle>Your Runs</MobileTitle>
      <RunWrapper>
        {runList.map(run => {
          return <RunInstance data={run} key={run.id} onDelete={refreshRuns} />;
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
