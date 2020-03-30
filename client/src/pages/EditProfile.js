import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import TextInput from '../components/TextInput';

const Container = styled.div`
  display: flex;
`;
const SideNav = styled.nav`
  flex: 1;
`;
const MainForm = styled.main`
  flex: 4;
  box-shadow: 0px 10px 23px 0px rgba(0, 0, 0, 0.2);
  margin: 0 10vw;
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  justify-content: flex-start;
`;

const SubsectionTitle = styled.h3`
  grid-row: 1;
  grid-column: 1/3;
`;

function EditProfile() {
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Container>
      <SideNav />
      <MainForm>
        <Formik
          initialValues={{ firstName: '', lastName: '', skill: '', rate: 0, email: '' }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string(),
            email: Yup.string().required('Required'),
            skill: Yup.string().required('Required'),
            rate: Yup.number().required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          <StyledForm>
            <SubsectionTitle>Basic Information</SubsectionTitle>
            <TextInput row={2} col={1} label="First Name" name="firstName" type="text" />
            <TextInput row={2} col={2} label="Last Name" name="lastName" type="text" />
            <TextInput row={3} col={1} label="Email" name="email" type="text" />
            <TextInput row={4} col={1} label="Skill" name="skill" type="text" />
            <TextInput row={5} col={1} label="Rate" name="rate" type="number" />
          </StyledForm>
        </Formik>
      </MainForm>
    </Container>
  );
}

export default EditProfile;
