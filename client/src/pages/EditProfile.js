import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import SideNav from '../components/SideNav';
import BasicInformation from '../components/Profile/BasicInformation';
import AboutMe from '../components/Profile/AboutMe';
import Contact from '../components/Profile/Contact';
import Client from '../utils/HTTPClient';

const Container = styled.div`
  display: flex;
`;

const MainForm = styled.main`
  flex: 4;
  box-shadow: 0px 10px 23px 0px rgba(0, 0, 0, 0.2);
  margin: 0 10vw;
  padding: 2rem 4rem;
`;

const reducer = (state, action) => {
  switch (action.type){
    case 
  }
}

const initialState = {

}

function EditProfile() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await Client.request('endpoint');
      setUserData(data);
    };
    // fetchProfile()
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Container>
      <SideNav />
      <MainForm>
        <BasicInformation
          initialValues={{ firstName: '', lastName: '', specialization: '', rate: 0, email: '' }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('*Required'),
            lastName: Yup.string(),
            specialization: Yup.string().required('*Required'),
            rate: Yup.number().required('*Required'),
          })}
        />

        <AboutMe
          initialValues={{ description: '' }}
          validationSchema={Yup.object({
            description: Yup.string(),
          })}
          onSubmit={handleSubmit}
        />
        <Contact
          initialValues={{ description: '' }}
          validationSchema={Yup.object({
            phone: Yup.string().min(10, 'Must be at least 10 digits'),
            email: Yup.string()
              .required('*Required')
              .email('Invalid email'),
          })}
        />
      </MainForm>
    </Container>
  );
}

export default EditProfile;
