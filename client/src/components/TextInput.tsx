/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components/macro';
import { useForm, Controller } from 'react-hook-form';

type ContainerProps = {
  col: number | string;
  row: number | string;
};

const Container = styled.div<ContainerProps>`
  grid-column: ${p => p.col};
  grid-row: ${p => p.row};
  display: flex;
  flex-direction: column;
  padding: 1rem;
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

type Props = {
  label: string;
  row: number | string;
  col: number | string;
  name: string;
  value?: string;
  type: string;
};

const TextInput = React.forwardRef((props: Props, ref: any) => {
  const { row, col, name, label } = props;
  return (
    <Container row={row} col={col}>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput type="text" ref={ref} name={name} />
    </Container>
  );
});

export default TextInput;
