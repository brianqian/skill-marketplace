import React, { useState, useEffect, SyntheticEvent } from 'react';
import styled from 'styled-components';
import useFetch from '../hooks/useFetch/useFetch';
import { COURSES_ROUTE, CATEGORIES_ROUTE } from '../Routes';
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
  name: string;
  description: string;
  category: string;
  rate: number;
};

function LoginForm() {
  const [formValue, setFormValue] = useState<FormT>({ name: '', description: '', category: '', rate: 0 });
  const { data, error, fetch, isLoading } = useFetch();
  const history = useHistory();
  // TODO Display error messages to the user

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { name, description, category, rate } = formValue;
    await fetch.post(COURSES_ROUTE, { body: { name, description, category, rate } });
    //history.push('/');
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
          <label htmlFor="">Course Name</label>
          <input type="text" name="name" />
        </InputContainer>
        <InputContainer>
          <label htmlFor="">Description</label>
          <textarea name="description" />
        </InputContainer>
        <InputContainer>
          <label htmlFor="">Category</label>
          <select name="category">
            <option selected={true} value="Cooking">Cooking</option>
            <option value="Coding">Coding</option>
            <option value="Music">Music</option>
            <option value="Writing">Writing</option>
            <option value="InvalidValue">InvalidValue</option>
          </select>
        </InputContainer>
        <InputContainer>
          <label htmlFor="">Rate</label>
          <input type="number" name="rate" />
        </InputContainer>
        <input type="submit" />
      </form>
    </Container>
  );
}

export default LoginForm;
