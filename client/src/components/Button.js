import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
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

function Button({ className, children, primary, secondary }) {
  return (
    <Container className={className} primary={primary} secondary={secondary}>
      {children}
    </Container>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  primary: true,
  secondary: false,
  className: '',
};

export default Button;
