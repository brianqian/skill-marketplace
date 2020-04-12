import React, { useState } from 'react';
import styled from 'styled-components';
import Authenticate from '../utils/Authenticator';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
`;

<<<<<<< HEAD
function LoginForm(props) {
    const [formValue, setFormValue] = useState({});
    // TODO Display error messages to the user
    const handleSubmit = e => {
        e.preventDefault();
        Authenticate(formValue.email, formValue.password).then(result => {
            console.log(result);
            if (result === 201)
            {
                console.log("Successfully logged in!");
                props.history.push('/');
            }
            else
            {
                console.log("Username or password was incorrect");
            }
        });
=======
function LoginForm() {
  const [formValue, setFormValue] = useState({});
  // TODO Display error messages to the user
  const handleSubmit = e => {
    e.preventDefault();
    Authenticate(formValue.email, formValue.password).then(result => {
      console.log(result);
      if (result === 201) {
        console.log('Successfully logged in!');
        window.location.assign('/');
      } else {
        console.log('Username or password was incorrect');
      }
    });
>>>>>>> WIP

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
