import React from 'react';
import LoginForm from "../components/LoginForm";

function Login(props) {
    return (<LoginForm history={props.history} />);
}

export default Login;