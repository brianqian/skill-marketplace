import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components/macro';
import * as Yup from 'yup';
import BasicInformation from '../components/Profile/BasicInformation';
import AboutMe from '../components/Profile/AboutMe';
import Contact from '../components/Profile/Contact';
import Settings from '../components/Profile/Settings';
import Client from '../utils/HTTPClient';
import Layout from '../components/Layout/ProfilePageLayout';
import {FormikConfig, FormikHelpers, FormikValues} from "formik/dist/types";

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

  // const handleSubmit = (values, { setSubmitting }) => {
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2));
  //     setSubmitting(false);
  //   }, 400);
  // };

  const handleSubmit = () => {};



  return (
    <Layout>
      <BasicInformation
          formikInfo={{initialValues: state.basic, onSubmit: handleSubmit}}
        validationSchema={Yup.object({
          firstName: Yup.string().required('*Required'),
          lastName: Yup.string(),
          specialization: Yup.string().required('*Required'),
          rate: Yup.number().required('*Required'),
        })}
        title="Basic Information"
      />
      <AboutMe
          formikInfo={{initialValues: state.aboutMe, onSubmit: handleSubmit}}
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
        onSubmit={handleSubmit}
        title="Contact"
      />
      <Settings
        initialValues={state.settings}
        validationSchema={Yup.object({
          password: Yup.string().min(6, 'Must be at least 6 digits'),
        })}
        onSubmit={handleSubmit}
        title="Settings2"
      />
    </Layout>
  );
}

export default EditProfile;
