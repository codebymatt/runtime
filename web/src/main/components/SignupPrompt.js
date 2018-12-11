import React from 'react';
import { Link } from 'react-router-dom';

import './SignupPrompt.sass'

const SignupPrompt = () => {
    // TODO: REFACTOR LOGIN/SIGNUP PROMPTS TO USE SAME COMPONENT STRUCTURE
    return (
        <div className="signup-prompt">
            <p>Don't have an account yet?</p>
            <p><Link to='/'>Sign up here</Link></p>
        </div>
    );
}

export default SignupPrompt;