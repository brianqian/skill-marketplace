import React from 'react';

import TextInput from '../TextInput';
import ProfileSubsection from '../Layout/ProfileSubsection';

function AboutMe(props) {
  return (
    <ProfileSubsection {...props}>
      <TextInput row="2/5" col="1/3" label="Description" name="description" type="text" />
    </ProfileSubsection>
  );
}

export default AboutMe;
