import React, { useEffect, useRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import SideNav from '../SideNav';
import Card from '../Card';

const Container = styled.div`
  display: flex;
`;

function ProfilePageLayout({ children }) {
  const [sections, setSections] = useState({});

  // SideNav needs click listeners that scroll to each section
  // SideNav should receive and object of {<sectionTitle>: <clickHandler>}
  // Each section needs to be mapped over with refs
  // State Object keeps track of refs and click listeners

  // const clickHandler = useCallback(
  //   ref => {
  //     console.log(ref.current);
  //   },
  //   []
  // );

  // useEffect(() => {
  //   React.Children.map(children, child => {
  //     const title = child.props.title || child.type.name;
  //     const ref = useRef(null)
  //     setSections({ ...sections, [title]: {handler: clickHandler} });
  //     // const ref = useRef(null);
  //     // refs[title] = {ref, clickHandler: clickHandler(ref)};
  //     // React.cloneElement(child, {ref});
  //   });
  // }, []);

  return (
    <Container>
      <SideNav sections={sections} />
      <Card w="1200px" m="0 0 150px 100px" p="2rem 4rem" flexDirection="column">
        {children}
      </Card>
    </Container>
  );
}

export default ProfilePageLayout;
