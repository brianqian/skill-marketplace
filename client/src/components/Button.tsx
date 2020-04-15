import React from 'react';
import styled from 'styled-components';

const Container = styled.div<Props>`
  color: ${p => p.theme.color.primary};
  border: 1.5px solid ${p => p.theme.color.primary};
  background-color: ${p => p.primary && p.theme.color.primary};
  background-color: ${p => p.secondary && 'white'};
  color: ${p => p.primary && 'white'};
  color: ${p => p.secondary && p.theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 0.5rem;
`;

type Props = {
  primary?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
  className?: string;
};

function Button({ className, children, primary, secondary }: Props) {
  return (
    <Container className={className} primary={primary} secondary={secondary}>
      {children}
    </Container>
  );
}

export default Button;
