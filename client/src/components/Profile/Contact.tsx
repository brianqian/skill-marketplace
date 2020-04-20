import React, {ReactNode} from 'react';
import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';
import {FormikConfig, FormikValues} from "formik";

type Props = {
    children: ReactNode;
    title: string;
    formikInfo: FormikConfig<FormikValues>;
};

function Contact(props: Props) {

    function handlenothing(){}
  return (
    <ProfileSubsection {...props}>
      <TextInput row={2} col={1} label="Phone" name="phone"  onBlur={handlenothing} onChange={handlenothing} value=""/>
      <TextInput row={3} col={1} label="Email" name="email"  onBlur={handlenothing} onChange={handlenothing} value=""/>
    </ProfileSubsection>
  );
}

export default Contact;
