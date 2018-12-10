import React from 'react';
import './LoginPrompt.sass'

const LoginPrompt = () => {
    return (
        <div className="login-prompt">
            <p>Already have an account?</p>
            <p><a href='/login'>Login here</a></p>
        </div>
    );
}

export default LoginPrompt;