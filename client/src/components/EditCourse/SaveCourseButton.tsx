import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Button from '../Button';

const Container = styled(Button)`
  align-self: flex-end;
  width: 130px;
  margin: 0.5rem;
`;

const SaveCourseButton = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Container
      type={isSubmitted ? 'submit' : undefined}
      onClick={() => setIsSubmitted(true)}
      primary={!isSubmitted}
    >
      {isSubmitted ? <p>Changes Saved!</p> : <p>Save Changes</p>}
    </Container>
  );
};

export default SaveCourseButton;
