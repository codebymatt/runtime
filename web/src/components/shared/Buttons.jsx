import React from "react";
import * as styles from "../../styles";
import styled from "styled-components";

const BaseButton = ({ text, clickHandler, backgroudColor, textColor }) => {
  return (
    <Button
      onClick={clickHandler}
      backgroudColor={backgroudColor}
      textColor={textColor}
    >
      {text}
    </Button>
  );
};

export const DangerButton = ({ text, clickHandler }) => {
  return (
    <BaseButton
      clickHandler={clickHandler}
      backgroudColor={styles.dangerColor}
      textColor={styles.altTextColor}
      text={text}
    />
  );
};

export const ActionButton = ({ text, clickHandler }) => {
  return (
    <BaseButton
      clickHandler={clickHandler}
      backgroudColor={styles.primaryColor}
      textColor={styles.altTextColor}
      text={text}
    />
  );
};

const Button = styled.button`
  height: 45px;
  width: 150px;
  background-color: ${props => props.backgroudColor};
  box-shadow: ${styles.boxShadow};
  border-style: none;
  color: ${props => props.textColor};
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    box-shadow: ${styles.focusedBoxShadow};
  }

  @media (max-width: 420px) {
    font-size: 20px;
  }
`;
