/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled.input`
  grid-column: ${p => p.col};
  grid-row: ${p => p.row};
  border-radius: 8px;
  line-height: 40px;
  height: 50px;
  outline: none;
  max-width: 400px;
  border: 1px solid #aaa;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    border-color: ${p => p.theme.tailwind.blue8};
  }
`;

const StyledLabel = styled.label`
  text-transform: uppercase;
  color: #888;
  font-size: 14px;

  ${StyledInput}:focus & {
    color: red;
  }
`;

function TextInput({ label, row, col, ...props }) {
  const [field, meta] = useField(props);
  return (
    <Container row={row} col={col}>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </Container>
  );
}

export default TextInput;
