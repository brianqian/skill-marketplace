import React from 'react';
import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';

function Settings(props) {
  return (
    <ProfileSubsection {...props}>
      <TextInput row={2} col={1} label="Password" name="password" type="password" />
    </ProfileSubsection>
  );
}

export default Settings;
