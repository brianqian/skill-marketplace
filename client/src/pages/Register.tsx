import React from 'react';
import RegisterForm from '../components/RegisterForm';
import useFetch from '../hooks/useFetch/useFetch';
import Client from '../utils/HTTPClient';

<<<<<<< HEAD
function Register(props) {
    return (<RegisterForm history={props.history}/>);
=======
function Register() {
  const { data, error, fetch, isLoading } = useFetch();

  const handleSubmit = async ({ email, password, first_name, last_name }) => {
    console.log(email, password);
    await fetch.post('/users', { email, password, first_name, last_name });
    // await Client.request('/users', 'POST', { email, password, first_name, last_name });
    await fetch.post('/authentication', { strategy: 'local', email, password });
    console.log(data);
  };

  return <RegisterForm registerUser={handleSubmit} />;
>>>>>>> WIP
}

export default Register;
