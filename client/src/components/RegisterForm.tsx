import React, { useState, SyntheticEvent } from 'react';
import styled from 'styled-components';
import useFetch from '../hooks/useFetch/useFetch';
import { REGISTER_ROUTE } from '../Routes';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
`;

type FormT = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

function RegisterForm() {
  const [formValue, setFormValue] = useState<FormT>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const { data, error, fetch, isLoading } = useFetch();
  const history = useHistory();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch.post(REGISTER_ROUTE, { body: formValue });
    localStorage.setItem('token', data);
    history.push('/');
  };

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as typeof e.target & {
      name: 'email' | 'password' | 'first_name' | 'last_name';
      value: string;
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
