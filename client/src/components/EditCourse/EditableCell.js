import React from 'react';
import styled from 'styled-components';
import TextInput from '../TextInput';

const Container = styled.div``;

function EditableCell({ canEdit }) {
  return <Container>{canEdit ? <TextInput /> : <p>{classInfo.title}</p>}</Container>;
}

export default EditableCell;
