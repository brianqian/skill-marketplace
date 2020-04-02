import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components/macro';
import * as Yup from 'yup';
import SideNav from '../components/SideNav';
import BasicInformation from '../components/Profile/BasicInformation';
import AboutMe from '../components/Profile/AboutMe';
import Contact from '../components/Profile/Contact';
import Settings from '../components/Profile/Settings';
import Client from '../utils/HTTPClient';
import Card from '../components/Card';

const Container = styled.div`
  display: flex;
`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_USER':
      return { ...state, user: action.payload };
    default:
      console.error('Invalid reducer in Edit Profile');
  }
};

const initialState = {
  basic: {
    firstName: '',
    lastName: '',
    specialization: '',
    rate: 0,
  },
  aboutMe: {
    description: '',
  },
  contact: {
    email: '',
    phone: '',
  },
  settings: {
    password: '',
  },
};

function EditProfile() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await Client.request('endpoint');
      // setUserData(data);
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
      <Card w="1200px" m="0 0 150px 0" p="2rem 4rem" flexDirection="column">
        <BasicInformation
          initialValues={state.basic}
          validationSchema={Yup.object({
            firstName: Yup.string().required('*Required'),
            lastName: Yup.string(),
            specialization: Yup.string().required('*Required'),
            rate: Yup.number().required('*Required'),
          })}
          title="Basic Information"
        />
        <AboutMe
          initialValues={state.aboutMe}
          validationSchema={Yup.object({
            description: Yup.string(),
          })}
          onSubmit={handleSubmit}
          title="About Me"
        />
        <Contact
          initialValues={state.contact}
          validationSchema={Yup.object({
            phone: Yup.string().min(10, 'Must be at least 10 digits'),
            email: Yup.string()
              .required('*Required')
              .email('Invalid email'),
          })}
          title="Contact"
        />
        <Settings
          initialValues={state.settings}
          validationSchema={Yup.object({
            password: Yup.string().min(6, 'Must be at least 6 digits'),
          })}
          title="Settings"
        />
      </Card>
    </Container>
  );
}

export default EditProfile;
