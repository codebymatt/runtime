import React from "react";
import styled from "styled-components";

import * as styles from "../styles";

const RunList = () => {
  return (
    <ComponentWrapper>
      <HeadingsWrapper>
        <Heading name="Distance" flexGrow={1} />
        <Heading name="Time" flexGrow={1} />
        <Heading name="Pace (min/km)" flexGrow={1} />
        <Heading name="Date" flexGrow={3} textAlign="right" />
      </HeadingsWrapper>
      <BackgroundCard />
    </ComponentWrapper>
  );
};

export default RunList;

const Heading = ({ flexGrow, name, textAlign }) => {
  return (
    <HeadingText flexGrow={flexGrow} textAlign={textAlign}>
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
`;

const HeadingsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0px 20px;
  margin-bottom: 10px;
`;

const HeadingText = styled.p`
  text-transform: uppercase;
  flex-grow: ${props => props.flexGrow};
  text-align: ${props => (props.textAlign === "right" ? "right" : "left")};
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 0px;
`;

const BackgroundCard = styled.div`
  box-shadow: ${styles.boxShadow};
  width: 900px;
  min-height: 100px;
`;
