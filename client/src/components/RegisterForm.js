import React, { useState } from 'react';
import styled from 'styled-components';
import HttpClient from '../utils/HTTPClient';
import Authenticate from '../utils/Authenticator';
import useFetch from '../hooks/useFetch';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
`;

<<<<<<< HEAD
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
=======
function RegisterForm({ registerUser }) {
  const [formValue, setFormValue] = useState({});
  const { data, error, fetch, isLoading } = useFetch();
>>>>>>> WIP

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch.get('https://pokeapi.co/api/v2/pokemon/ditto');
    console.log('DATA', data);

    // const { email, password } = formValue;
    // registerUser(formValue);

    // HttpClient.request('/users', 'POST', formValue).then(resp => {
    //   if (resp.status === 201) {
    //     Authenticate(formValue.email, formValue.password).then(result => {
    //       console.log(result);
    //       if (result.status === 201) {
    //         console.log('Successfully registered and logged in!');
    //         window.location.assign('/');
    //       } else {
    //         console.log(
    //           "This shouldn't happen, you just registered, must be something wrong on the backend..."
    //         );
    //       }
    //     });
    //   }
    // });
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
