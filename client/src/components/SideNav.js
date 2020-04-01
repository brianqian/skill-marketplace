import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.nav`
  color: ${p => p.theme.color.gray};
  font-size: 1.2em;
  line-height: 1.5em;
  user-select: none;
  width: 300px;
  display: flex;
  justify-content: center;
  padding: 5rem 0;
  font-family: 'Sen';
  transition: 0.2s ease-in;
  ul {
    list-style: none;
    position: fixed;
  }
  li {
    padding: 0.5rem 0;
  }
  li:hover {
    color: ${p => p.theme.color.primary};
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
