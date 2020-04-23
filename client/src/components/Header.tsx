import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { EDIT_PROFILE_ROUTE, HOME_ROUTE } from '../Routes';

const Container = styled.header`
  height: ${p => p.theme.headerHeight};
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
    font-family: ${p => p.theme.textFont};
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
        <Link to="/">Browse</Link>
        <a href="#">Inbox</a>
        <Avatar size={30} />
        <Link to={EDIT_PROFILE_ROUTE}>Profile</Link>
      </Nav>
    </Container>
  );
}

export default Header;
