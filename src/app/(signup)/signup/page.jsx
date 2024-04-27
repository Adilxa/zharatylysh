import React from 'react'
import SignUpForm from '../signUpForm'
import scss from "./SignUp.module.scss"

function SignUp() {
    return (
        <section className={scss.wrapper}>
            <SignUpForm />
        </section>
    )
}

export default SignUp