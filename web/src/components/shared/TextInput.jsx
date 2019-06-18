import React from "react";
import * as styles from "../../styles";
import styled from "styled-components";

const TextInput = ({ title, placeholder, size, type }) => {
  return (
    <InputWrapper>
      <Title>{title}</Title>
      <InputCard type={type || "text"} size={size} placeholder={placeholder} />
    </InputWrapper>
  );
};

export default TextInput;

const InputWrapper = styled.div`
  text-align: left;
`;

const Title = styled.h5`
  text-transform: uppercase;
  padding-left: 10px;
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: "bold";
`;

const InputCard = styled.input`
  padding-left: 10px;
  font-weight: "bold";
  height: 45px;
  width: ${props => (props.size === "small" ? "210px" : "450px")};
  font-size: 20px;
  box-shadow: ${styles.boxShadow};
  border-style: none;
`;
