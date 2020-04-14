import React, { useState, SyntheticEvent } from 'react';
import styled from 'styled-components';
import Authenticate from '../utils/Authenticator';
import useFetch from '../hooks/useFetch/useFetch';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
`;

type FormValue = {
  email: string;
  password: string;
};

function LoginForm() {
  const [formValue, setFormValue] = useState<FormValue>({ email: '', password: '' });
  const { data, error, fetch, isLoading } = useFetch();
  // TODO Display error messages to the user
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const url = '/api/auth/login';
    const { email, password } = formValue;
    await fetch.post({ url, body: { email, password } });
    localStorage.setToken('token', data);
  };

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as typeof e.target & {
      name: 'email' | 'password';
      value: 'string';
    };
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
