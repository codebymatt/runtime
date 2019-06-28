import React from "react";
import * as styles from "../../styles";
import styled from "styled-components";

const ActionButton = ({ text, clickHandler }) => {
  return <Button onClick={clickHandler}>{text}</Button>;
};

export default ActionButton;

const Button = styled.button`
  height: 45px;
  width: 150px;
  background-color: ${styles.primaryColor};
  box-shadow: ${styles.boxShadow};
  border-style: none;
  color: ${styles.altTextColor};
  font-size: 22px;
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
