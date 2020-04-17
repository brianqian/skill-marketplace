import React, { ReactNode, ReactElement } from 'react';
import styled from 'styled-components/macro';
import { useForm } from 'react-hook-form';

const StyledForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, minmax(40px, 1fr));
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 4rem;
  border-bottom: 1px solid ${p => p.theme.changeOpacity('#cccccc', 50)};
`;

const SubsectionTitle = styled.h2`
  grid-row: 1;
  grid-column: 1/3;
`;

type Props = {
  children: ReactElement | ReactElement[];
  title: string;
  // submitHandler: (x: any) => void;
};

function ProfileSubsection({ children, title }: Props) {
  const { register, handleSubmit, errors } = useForm();

  // const refChildren = React.Children.map(children, child => {
  //   return React.cloneElement(child, { ref: (e: any) => register(e) });
  // });

  return (
    <StyledForm>
      <SubsectionTitle>{title}</SubsectionTitle>
      {children}
    </StyledForm>
  );
}

export default ProfileSubsection;
