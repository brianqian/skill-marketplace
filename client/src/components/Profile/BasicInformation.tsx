import React, {ReactNode} from 'react';
import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';
import {FormikConfig, FormikValues} from "formik";

type Props = {
    children: ReactNode;
    title: string;
    formikInfo: FormikConfig<FormikValues>;
};

function BasicInformation(props: Props) {
    function handlenothing(){}
    return (
    <ProfileSubsection {...props}>
      <TextInput row={2} col={1} label="First Name*" name="firstName"  onBlur={handlenothing} onChange={handlenothing} value=""/>
      <TextInput row={2} col={2} label="Last Name" name="lastName"  onBlur={handlenothing} onChange={handlenothing} value=""/>
      <TextInput row={3} col={1} label="Specialization" name="specialization"  onBlur={handlenothing} onChange={handlenothing} value=""/>
      <TextInput row={4} col={1} label="Rate*" name="rate"  onBlur={handlenothing} onChange={handlenothing} value=""/>
    </ProfileSubsection>
  );
}

export default BasicInformation;
