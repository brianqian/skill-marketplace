import React, { useState } from 'react';
import styled from 'styled-components';
import HttpClient from '../utils/HTTPClient'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
`;

function RegisterForm() {
    const [formValue, setFormValue] = useState({});
    const handleSubmit = e => {
        e.preventDefault();
        HttpClient.request('/users/', 'POST', JSON.stringify(formValue)).then(data => {
            console.log(data);
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