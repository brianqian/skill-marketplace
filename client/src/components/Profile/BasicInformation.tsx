import React from 'react';
import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';

function BasicInformation(props) {
  return (
    <ProfileSubsection {...props}>
      <TextInput row={2} col={1} label="First Name*" name="firstName" type="text" />
      <TextInput row={2} col={2} label="Last Name" name="lastName" type="text" />
      <TextInput row={3} col={1} label="Specialization" name="specialization" type="text" />
      <TextInput row={4} col={1} label="Rate*" name="rate" type="number" />
    </ProfileSubsection>
  );
}

export default BasicInformation;
