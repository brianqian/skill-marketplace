import React, {ReactNode} from 'react';
import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';
import {FormikConfig, FormikValues} from "formik";

type Props = {
    children: ReactNode;
    title: string;
    formikInfo: FormikConfig<FormikValues>;
};

function Settings(props:Props) {
    function handlenothing(){}
  return (
    <ProfileSubsection {...props}>
      <TextInput row={2} col={1} label="Password" name="password"  onBlur={handlenothing} onChange={handlenothing} value=""/>
    </ProfileSubsection>
  );
}

export default Settings;
