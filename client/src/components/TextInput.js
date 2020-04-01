/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  & .error {
    font-size: 0.8em;
    color: red;
  }
`;

const StyledLabel = styled.label`
  text-transform: uppercase;
  color: #aaa;
  font-weight: 400;
  font-size: 15px;
`;

const StyledInput = styled.input`
  grid-column: ${p => p.col};
  grid-row: ${p => p.row};
  max-width: 400px;
`;

function TextInput({ label, row, col, ...props }) {
  const [field, meta] = useField(props);

  return (
    <Container row={row} col={col}>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput className="text-input" {...field} {...props} />
      {meta.value && meta.error ? <div className="error">{meta.error}</div> : null}
    </Container>
  );
}

export default TextInput;
