import React, { useState, SyntheticEvent } from 'react';
import styled from 'styled-components/macro';
import MediaContainer from './MediaContainer';
import Button from '../Button';
import FlexDiv from '../FlexDiv';
import SaveCourseButton from './SaveCourseButton';
import DeleteCourseButton from './DeleteCourseButton';

const Container = styled.div`
  display: flex;
  font-size: 1.2em;
  cursor: pointer;
  height: 100%;
  align-items: center;
  padding: 0.5rem 1rem;
  :hover {
    background-color: hsla(181, 31%, 30%, 0.08);
  }
`;

const Description = styled.textarea`
  height: 160px;
  width: 500px;
  border: 1px solid lightgray;
  resize: none;
  font-family: ${p => p.theme.textFont};
`;

const Cell = styled.div<{ flex: number }>`
  flex: ${p => p.flex};
`;

const ExpandableDrawer = styled.div`
  display: flex;
  height: 200px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const StyledFlexDiv = styled(FlexDiv)`
  justify-content: flex-end;
`;

type Props = {
  classInfo?: any; // TODO: make mandatory
  isActive?: boolean;
};

function Row({ classInfo, isActive }: Props) {
  const [expandCourse, setExpandCourse] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    const { value } = e.target as typeof e.target & {
      value: string;
    };
    console.log('submitted', value);
  };

  return (
    <>
      <Container onClick={() => setExpandCourse(!expandCourse)}>
        <Cell flex={2}>
          <p>{classInfo.title}</p>
        </Cell>
        <Cell flex={2}>
          <p>{classInfo.category}</p>
        </Cell>
        <Cell flex={1}>
          <p>${classInfo.rate}</p>
        </Cell>
      </Container>
      {expandCourse && (
        <ExpandableDrawer>
          <MediaContainer />
          <DescriptionContainer onSubmit={handleSubmit}>
            <Description placeholder="Add a description" />
            <StyledFlexDiv>
              <DeleteCourseButton handleClick={() => {}} />
              <SaveCourseButton handleClick={() => {}} />
            </StyledFlexDiv>
          </DescriptionContainer>
        </ExpandableDrawer>
      )}
    </>
  );
}

export default Row;
