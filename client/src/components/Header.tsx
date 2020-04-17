import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { EDIT_PROFILE_ROUTE } from '../Routes';

const Container = styled.header`
  height: 6rem;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding-right: 3rem;
  > * {
    padding: 0 1rem;
    text-transform: uppercase;
    text-decoration: none;
    color: ${p => p.theme.strokeColor};
    font-family: 'Roboto';
  }
`;

const Logo = styled.div`
  height: 100%;
  width: 200px;
  background-color: pink;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Header() {
  return (
    <Container>
      <Logo>
        <Link to="/">LOGO</Link>
      </Logo>
      <Nav>
        <a href="#">Browse</a>
        <a href="#">Inbox</a>
        <Avatar />
        <Link to={EDIT_PROFILE_ROUTE}>Profile</Link>
      </Nav>
    </Container>
  );
}

export default Header;
