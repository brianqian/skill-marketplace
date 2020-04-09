import React from 'react';
import styled from 'styled-components';

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
  background-color: ${p => p.theme.color.primary};
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
