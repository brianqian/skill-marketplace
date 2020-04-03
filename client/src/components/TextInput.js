/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components/macro';

const Container = styled.div`
  grid-column: ${p => p.col};
  grid-row: ${p => p.row};
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  & .error {
    font-size: 0.85em;
    color: red;
  }
`;

const StyledLabel = styled.label`
  text-transform: uppercase;
  color: #aaa;
  font-weight: 400;
  font-size: 0.85em;
  padding: 0.5rem 0;
`;

const StyledInput = styled.input`
  font-size: 1em;
  font-weight: 600;
  min-height: 3em;
  padding: 0 0.5rem;
  outline: none;
  border: 1px solid #aaa;
  border-radius: 5px;

  /*Removes spinner from number inputs */

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    border-color: ${p => p.theme.color.primary};
    border-width: 1.5px;
  }
`;

function TextInput({ label, row, col, ...props }) {
  const [field, meta] = useField(props);

  return (
    <Container row={row} col={col}>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput {...field} {...props} />
      {meta.value && meta.error ? <div className="error">{meta.error}</div> : null}
    </Container>
  );
}

export default TextInput;
