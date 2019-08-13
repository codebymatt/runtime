import React from "react";
import * as styles from "../../styles";
import styled from "styled-components";

const TextInput = ({ title, value, placeholder, size, type, onChange }) => {
  return (
    <InputWrapper>
      <Title>{title}</Title>
      <InputCard
        type={type || "text"}
        value={value || ""}
        size={size}
        placeholder={placeholder}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default TextInput;

const InputWrapper = styled.div`
  text-align: left;

  @media (max-width: 420px) {
    width: 100%;
  }
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
  -webkit-appearance: textfield;
  border-radius: 0px;

  @media (max-width: 420px) {
    width: 100%;
    font-size: 18px;
    -webkit-appearance: none;
  }
`;
