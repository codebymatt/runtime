import React from "react";
import * as styles from "../../styles";
import styled from "styled-components";

const BaseButton = ({
  text,
  clickHandler,
  backgroudColor,
  textColor,
  inactive,
  visible,
  fullWidthMobile
}) => {
  visible = visible === undefined ? true : visible;
  return (
    <Button
      onClick={clickHandler}
      backgroudColor={backgroudColor}
      textColor={textColor}
      inactive={inactive}
      visible={visible}
      fullWidthMobile={fullWidthMobile}
    >
      {text}
    </Button>
  );
};

export const DangerButton = ({
  text,
  clickHandler,
  inactive,
  visible,
  fullWidthMobile
}) => {
  return (
    <BaseButton
      clickHandler={clickHandler}
      backgroudColor={styles.dangerColor}
      textColor={styles.altTextColor}
      text={text}
      inactive={inactive}
      visible={visible}
      fullWidthMobile={fullWidthMobile}
    />
  );
};

export const ConfirmButton = ({
  text,
  clickHandler,
  inactive,
  visible,
  fullWidthMobile
}) => {
  return (
    <BaseButton
      clickHandler={clickHandler}
      backgroudColor={styles.confirmColor}
      textColor={styles.altTextColor}
      text={text}
      inactive={inactive}
      visible={visible}
      fullWidthMobile={fullWidthMobile}
    />
  );
};

export const ActionButton = ({
  text,
  clickHandler,
  inactive,
  visible,
  fullWidthMobile
}) => {
  return (
    <BaseButton
      clickHandler={clickHandler}
      backgroudColor={styles.primaryColor}
      textColor={styles.altTextColor}
      text={text}
      inactive={inactive}
      visible={visible}
      fullWidthMobile={fullWidthMobile}
    />
  );
};

const Button = styled.button`
  display: ${props => (props.visible ? "inline-block" : "none")}
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
  pointer-events: ${props => (props.inactive ? "none" : "auto")}

  &:hover {
    box-shadow: ${props => (props.inactive ? "none" : styles.focusedBoxShadow)};
  }

  @media (max-width: 420px) {
    font-size: 20px;
    width: ${props => (props.fullWidthMobile ? "100%" : "150px")}
  }
`;
