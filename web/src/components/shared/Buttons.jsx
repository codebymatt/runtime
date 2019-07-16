import React from "react";
import * as styles from "../../styles";
import styled from "styled-components";

const BaseButton = ({
  text,
  clickHandler,
  backgroudColor,
  textColor,
  inactive
}) => {
  return (
    <Button
      onClick={clickHandler}
      backgroudColor={backgroudColor}
      textColor={textColor}
      inactive={inactive}
    >
      {text}
    </Button>
  );
};

export const DangerButton = ({ text, clickHandler, inactive }) => {
  return (
    <BaseButton
      clickHandler={clickHandler}
      backgroudColor={styles.dangerColor}
      textColor={styles.altTextColor}
      text={text}
      inactive={inactive}
    />
  );
};

export const ActionButton = ({ text, clickHandler, inactive }) => {
  return (
    <BaseButton
      clickHandler={clickHandler}
      backgroudColor={styles.primaryColor}
      textColor={styles.altTextColor}
      text={text}
      inactive={inactive}
    />
  );
};

const Button = styled.button`
  height: 45px;
  width: 150px;
  background-color: ${props =>
    props.inactive ? styles.inactiveGrey : props.backgroudColor};
  box-shadow: ${props => (props.inactive ? "none" : styles.boxShadow)};
  border-style: none;
  color: ${props => props.textColor};
  font-size: 18px;
  font-weight: bold;
  cursor: ${props => (props.inactive ? "auto" : "pointer")};
  text-transform: uppercase;
  &:hover {
    box-shadow: ${props => (props.inactive ? "none" : styles.focusedBoxShadow)};
  }

  @media (max-width: 420px) {
    font-size: 20px;
  }
`;
