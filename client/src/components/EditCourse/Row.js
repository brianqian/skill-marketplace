import React, { useState } from 'react';
import styled from 'styled-components';
import MediaContainer from './MediaContainer';

const Container = styled.div`
  display: flex;
  font-size: 1.2em;
  cursor: pointer;
  height: 100%;
  align-items: center;
  padding: 0.5rem 1rem;
  :hover {
    background-color: hsla(181, 31%, 30%, 0.08);
  }
`;

const Description = styled.textarea`
  height: 160px;
  width: 500px;
  border: 1px solid lightgray;
  resize: none;
  font-family: ${p => p.theme.textFont};
`;

const Cell = styled.div`
  flex: ${p => p.flex};
`;

const ExpandableDrawer = styled.div`
  display: flex;
  height: 200px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const SaveButton = styled.input`
  height: 40px;
  background-color: ${p => p.theme.color.primary};
  border-style: none;
`;

const filler =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque repellendus in amet ipsam, rem ducimus beatae, recusandae temporibus ea aliquam, quia eos quo voluptatum. Ipsum, officia. Totam iste qui ducimus!Officiis sed officia, eligendi sint eos tempora nam vel facilis numquam autem repudiandae nobis laudantium unde velit! Quasi, minus explicabo, doloribus accusantium alias non, voluptas excepturi obcaecati error sint molestiae.';

function Row({ classInfo, isActive }) {
  const handleSubmit = () => {
    console.log('submitted');
  };

  return (
    <>
      <Container>
        <Cell flex={2}>
          <p>{classInfo.title}</p>
        </Cell>
        <Cell flex={2}>
          <p>{classInfo.category}</p>
        </Cell>
        <Cell flex={1}>
          <p>${classInfo.rate}</p>
        </Cell>
      </Container>
      <ExpandableDrawer>
        <MediaContainer />
        <DescriptionContainer onSubmit={handleSubmit}>
          <Description placeholder="Add a description" />
          <SaveButton type="submit" value="Save changes" />
        </DescriptionContainer>
      </ExpandableDrawer>
    </>
  );
}

export default Row;
