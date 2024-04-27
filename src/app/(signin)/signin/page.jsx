import React from 'react'
import SignInForm from './signInForm';
import scss from "./SignIn.module.scss";


function SignIn() {


    return (
        <div className={scss.wrapper}>
            <SignInForm />
        </div>
    )
}

export default SignIn