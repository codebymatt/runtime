import React from 'react';
import propTypes from 'prop-types';

import './SubmitButton.sass';

const SubmitButton = props => {
  const { onPress, text } = props;
  return (
    <button type="submit" onClick={onPress} className="basic-button submit-button">
      {text}
    </button>
  );
};

export default SubmitButton;

SubmitButton.propTypes = {
  onPress: propTypes.func.isRequired,
  text: propTypes.string,
};

SubmitButton.defaultProps = {
  text: 'Submit',
};
