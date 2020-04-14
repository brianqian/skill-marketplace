import React, { useState } from 'react';
import styled from 'styled-components';
import HttpClient from '../utils/HTTPClient';
import Authenticate from '../utils/Authenticator';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
`;

function RegisterForm(props) {
    const [formValue, setFormValue] = useState({});
    const handleSubmit = e => {
        e.preventDefault();
        HttpClient.request('/users/', 'POST', formValue).then(resp => {
            if (resp.status === 201)
            {
                Authenticate(formValue.email, formValue.password).then(result => {
                    console.log(result);
                    if (result === 201) {
                        console.log("Successfully registered and logged in!");
                        props.history.push('/');
                    } else {
                        console.log("This shouldn't happen, you just registered, must be something wrong on the backend...");
                    }
                });
            }
        });

    };
    const handleChange = e => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };
    return (
      <Container>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <InputContainer>
            <label htmlFor="">Email</label>
            <input type="text" name="email" />
          </InputContainer>
          <InputContainer>
            <label htmlFor="">First Name</label>
            <input type="text" name="first_name" />
          </InputContainer>
          <InputContainer>
            <label htmlFor="">Last Name</label>
            <input type="text" name="last_name" />
          </InputContainer>
          <InputContainer>
            <label htmlFor="">Password</label>
            <input type="password" name="password" />
          </InputContainer>
          <input type="submit" />
        </form>
      </Container>
    );
}

export default RegisterForm;