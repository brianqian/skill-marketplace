//@ts-nocheck

import React from 'react';
import styled from 'styled-components/macro';
import TextInput from '../TextInput';

const Container = styled.div``;

type Props = {
  canEdit: boolean;
};

function EditableCell({ canEdit }: Props) {
  // return <Container>{canEdit ? <TextInput /> : <p>{classInfo.title}</p>}</Container>;
}

export default EditableCell;
