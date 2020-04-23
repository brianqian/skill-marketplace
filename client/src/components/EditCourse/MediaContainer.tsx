import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  border: 1px solid lightgray;
  padding: 1rem;
`;

const MediaPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border: 4px dashed lightgray;
  border-radius: 8px;
`;

function MediaContainer() {
  return (
    <Container>
      <MediaPlaceholder />
      <MediaPlaceholder />
      <MediaPlaceholder />
    </Container>
  );
}

export default MediaContainer;
