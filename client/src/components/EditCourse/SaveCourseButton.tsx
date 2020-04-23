import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Button from '../Button';

const Container = styled(Button)`
  align-self: flex-end;
  width: 130px;
  margin: 0.5rem;
`;

type Props = {
  handleClick: () => void;
};

const SaveCourseButton = ({ handleClick }: Props) => {
  const [isActive, setIsActive] = useState(true);

  const onClick = () => {
    if (isActive) handleClick();
    setIsActive(false);
  };

  return (
    <Container onClick={onClick} primary={isActive}>
      {isActive ? <p>Save Changes</p> : <p>Changes Saved!</p>}
    </Container>
  );
};

export default SaveCourseButton;
