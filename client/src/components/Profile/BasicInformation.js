import React from 'react';
import { Formik } from 'formik';
import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';

function BasicInformation(props) {
  return (
    <Formik {...props}>
      <ProfileSubsection title="Basic Information">
        <TextInput row={2} col={1} label="First Name*" name="firstName" type="text" />
        <TextInput row={2} col={2} label="Last Name" name="lastName" type="text" />
        <TextInput row={3} col={1} label="Email*" name="email" type="email" required />
        <TextInput row={4} col={1} label="Specialization" name="specialization" type="text" />
        <TextInput row={5} col={1} label="Rate*" name="rate" type="number" />
      </ProfileSubsection>
    </Formik>
  );
}

export default BasicInformation;
