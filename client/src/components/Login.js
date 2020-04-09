import React, { useState } from 'react';
import useFetch from '../components/hooks/useFetch'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
`;

function LoginForm() {
    const [formValue, setFormValue] = useState({});
    const handleSubmit = e => {
        e.preventDefault();
        console.log(formValue);
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
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </InputContainer>
          <input type="submit" />
        </form>
      </Container>
    );
}

export default LoginForm;