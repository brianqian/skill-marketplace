import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components/macro';
import * as yup from 'yup';
import Layout from '../components/Layout/ProfilePageLayout';
import ProfileSubsection from '../components/Layout/ProfileSubsection';
import TextInput from '../components/TextInput';

import { useForm } from 'react-hook-form';

const reducer = (state: any, action: any) => {
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
  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: 'brian',
    },
  });
  const submitForm = (form: {}) => {
    console.log(form);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(submitForm)}>
        <ProfileSubsection title="Basic Information">
          <TextInput
            row={2}
            col={1}
            label="First Name*"
            name="firstName"
            type="text"
            ref={register}
          />
          <TextInput row={2} col={2} label="Last Name" name="lastName" type="text" ref={register} />
          <TextInput
            row={3}
            col={2}
            label="Specialty"
            name="specialty"
            type="text"
            ref={register}
          />
          <TextInput row={3} col={1} label="Rate*" name="rate" type="number" ref={register} />
        </ProfileSubsection>
        <ProfileSubsection title="About Me">
          <TextInput
            row="2/5"
            col="1/3"
            label="Description"
            name="description"
            type="text"
            ref={register}
          />
        </ProfileSubsection>
        <ProfileSubsection title="Contact">
          <TextInput row={2} col={1} label="Phone" name="phone" type="text" ref={register} />
          <TextInput row={3} col={1} label="Email" name="email" type="text" ref={register} />
        </ProfileSubsection>
        <ProfileSubsection title="Settings">
          <TextInput row={2} col={1} label="Password" name="password" type="text" ref={register} />
        </ProfileSubsection>
        <input type="submit" />
      </form>
      {/* <BasicInformation
          validationSchema={Yup.object({
            firstName: Yup.string().required('*Required'),
            lastName: Yup.string(),
            specialization: Yup.string().required('*Required'),
            rate: Yup.number().required('*Required'),
          })}
          title="Basic Information"
        /> */}
      {/* <AboutMe
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
      /> */}
    </Layout>
  );
}

export default EditProfile;
