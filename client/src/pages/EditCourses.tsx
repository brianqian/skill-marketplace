import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout/ProfilePageLayout';
import Row from '../components/EditCourse/Row';
import Button from '../components/Button';

type Flex = {
  flex?: number;
};

const Table = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: hsla(181, 25%, 25%, 0.25);
  box-shadow: 0px 10px 23px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Column = styled.div<Flex>`
  flex: ${p => p.flex};
`;

const ColumnTitle = styled.p`
  grid-row: 1;
  text-transform: uppercase;
  font-size: 0.8em;
`;

const CourseTable = styled.div`
  width: 100%;
  background-color: white;
  padding: 1rem 0;
`;

const Header = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  width: 130px;
  margin: 0.5rem 0;
`;

// Grid columns:
// Class Name
// Rate
// Category
// Description -- hidden in collpasable menu
// Media -- images/videos -- hidden in collapsable menu

const courses = [
  { title: 'Pottery', category: 'Arts & Crafts', rate: 22 },
  { title: 'HTML & CSS', category: 'Web Development', rate: 40 },
  { title: 'Basic Sous Vide', category: 'Cooking', rate: 15 },
  { title: 'How to play Poker', category: 'Games', rate: 20 },
];

function EditCourses() {
  return (
    <Layout>
      <StyledButton primary>Add Course</StyledButton>
      <Table>
        <Header>
          <Column flex={2}>
            <ColumnTitle>Class Name</ColumnTitle>
          </Column>
          <Column flex={2}>
            <ColumnTitle>Category</ColumnTitle>
          </Column>
          <Column flex={1}>
            <ColumnTitle>Rate</ColumnTitle>
          </Column>
        </Header>
        <CourseTable>
          {courses.map(course => (
            <Row classInfo={course} />
          ))}
        </CourseTable>
      </Table>
    </Layout>
  );
}

export default EditCourses;
