import React from 'react';
import { Formik } from 'formik';
import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';

function AboutMe(props) {
  return (
    <Formik {...props}>
      <ProfileSubsection title="About Me">
        <TextInput row="2/5" col="1/3" label="Description" name="description" type="text" />
      </ProfileSubsection>
    </Formik>
  );
}

export default AboutMe;
