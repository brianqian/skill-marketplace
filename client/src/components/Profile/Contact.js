import React from 'react';
import { Formik } from 'formik';
import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';

function Contact(props) {
  return (
    <ProfileSubsection {...props}>
      <TextInput row={2} col={1} label="Phone" name="phone" type="text" />
      <TextInput row={3} col={1} label="Email" name="email" type="email" />
    </ProfileSubsection>
  );
}

export default Contact;
