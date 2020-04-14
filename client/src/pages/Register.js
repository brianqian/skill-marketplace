import React from 'react';
import RegisterForm from "../components/RegisterForm";

function Register(props) {
    return (<RegisterForm history={props.history}/>);
}

export default Register;