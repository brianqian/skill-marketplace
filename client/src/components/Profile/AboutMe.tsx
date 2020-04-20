import React, {ReactNode} from 'react';

import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';
import {FormikConfig, FormikValues} from "formik";

type Props = {
    children: ReactNode;
    title: string;
    formikInfo: FormikConfig<FormikValues>;
};

function AboutMe(props: Props) {
    function handlenothing() {}
  return (
    <ProfileSubsection {...props}>
      <TextInput row="2/5" col="1/3" label="Description" name="description"  onBlur={handlenothing} onChange={handlenothing} value=""/>
    </ProfileSubsection>
  );
}

export default AboutMe;
