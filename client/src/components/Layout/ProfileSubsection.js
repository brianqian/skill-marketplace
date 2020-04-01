import React from 'react';
import styled from 'styled-components';
import { Form } from 'formik';

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, minmax(40px, 1fr));
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  border-bottom: 1px solid ${p => p.theme.changeOpacity('#cccccc', 50)};
  input {
    font-size: 1em;
    min-height: 40px;
    padding: 0 0.5rem;
    outline: none;
    border: 1px solid #aaa;
    border-radius: 5px;
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
  }
  textarea {
    height: 100%;
    font-size: 1em;
    padding: 0 0.5rem;
    outline: none;
    border: 1px solid #aaa;
    border-radius: 5px;
  }
`;

const SubsectionTitle = styled.h2`
  grid-row: 1;
  grid-column: 1/3;
`;

function ProfileSubsection({ children, title }) {
  const handleBlur = () => {
    console.log(title);
  };

  return (
    <StyledForm>
      <SubsectionTitle>{title}</SubsectionTitle>
      {children}
    </StyledForm>
  );
}

export default ProfileSubsection;
