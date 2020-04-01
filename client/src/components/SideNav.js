import React from 'react';
import styled from 'styled-components';

const Container = styled.nav`
  > ul {
    list-style: none;
  }
`;

function SideNav() {
  return (
    <Container>
      <ul>
        <li>Basic Information</li>
        <li>About Me</li>
        <li>About Course</li>
        <li>Contact</li>
        <li>Settings</li>
      </ul>
    </Container>
  );
}

export default SideNav;
