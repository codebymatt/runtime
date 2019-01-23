import React from 'react';

import './SubmitButton.sass';

const SubmitButton = (props) => {
    return (
        <button type='submit' onClick={props.onPress} className='submit-button'>
            {props.text}
        </button>
    );
}

export default SubmitButton;