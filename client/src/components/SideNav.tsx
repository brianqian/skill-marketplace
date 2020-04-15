import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

type Props = {};

const Container = styled.nav`
  color: ${p => p.theme.color.gray};
  font-size: 1.15em;
  line-height: 1.5em;
  user-select: none;
  width: 300px;
  display: flex;
  justify-content: center;
  font-family: 'Sen';
  transition: 0.2s ease-in;

  ul {
    list-style: none;
    position: ${p => (p.isLocked ? 'fixed' : 'relative')};
    top: 5rem;
  }
  li {
    padding: 0.5rem 0;
  }
  li:hover {
    color: ${p => p.theme.color.primary};
  }
`;

function SideNav({ sections }) {
  const [locked, setLocked] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const distanceFromTop = ref.current.getBoundingClientRect().y;
      if (locked && distanceFromTop < 0) return;
      if (!locked && distanceFromTop > 0) return;
      setLocked(distanceFromTop < 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [locked]);

  return (
    <Container ref={ref} isLocked={locked}>
      <ul>
        <li>Basic Information</li>
        <li>About Me</li>
        <li>About Course</li>
        <li>Contact</li>
        <li>Settings</li>
        <Link to="/profile/classes">Class Management</Link>
      </ul>
    </Container>
  );
}

export default SideNav;
