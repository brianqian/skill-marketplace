import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Container = styled(Button)`
  align-self: flex-end;
  width: 130px;
  margin: 0.5rem;
  background-color: white;
  color: ${p => p.theme.color.primary};
`;

type Props = {
  isActive?: boolean;
  handleClick: () => void;
};

const SaveCourseButton = ({ isActive, handleClick }: Props) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <Container onClick={handleClick}>
      <p>Save Changes</p>
    </Container>
  );
};

export default SaveCourseButton;
