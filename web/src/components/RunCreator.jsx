import React from "react";
import styled from "styled-components";

import * as styles from "../styles";

const RunCreator = () => {
  return <BackgroundCard />;
};

export default RunCreator;

const BackgroundCard = styled.div`
  margin: 45px auto 0px;
  height: 120px;
  width: 900px;
  box-shadow: ${styles.boxShadow};
`;
