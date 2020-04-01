import React from 'react';
import { Formik } from 'formik';
import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';

function Contact(props) {
  return (
    <Formik {...props}>
      <ProfileSubsection title="About Course">
        <TextInput row={1} col={1} label="Description" name="description" type="text" />
      </ProfileSubsection>
    </Formik>
  );
}

export default Contact;
