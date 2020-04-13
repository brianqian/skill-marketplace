import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: ${p => p.size}px;
  width: ${p => p.size}px;
  border-radius: ${p => p.size / 2}px;
  background-color: ${p => p.theme.color.primary};
`;

function Avatar({ size = '50', src, className = '' }) {
  return <Container className={className} size={size}></Container>;
}

export default Avatar;
