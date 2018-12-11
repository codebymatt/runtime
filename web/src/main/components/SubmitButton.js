import React from 'react';

import './SubmitButton.sass';

const SubmitButton = (props) => {
    return (
        <div onClick={props.onPress} className='submit-button'>
            {props.text}
        </div>
    );
}

export default SubmitButton;