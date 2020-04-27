import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import MediaContainer from './MediaContainer';
import Button from '../Button';
import FlexDiv from '../FlexDiv';
import SaveCourseButton from './SaveCourseButton';
import DeleteCourseButton from './DeleteCourseButton';
import { useForm } from 'react-hook-form';
import EditableCell from './EditableCell';
import { ICourse } from '../../global';
import useUpload from '../../hooks/useUpload/useUpload';

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
  courseInfo: ICourse;
};

// State of rows:
//  - Row is selected (clicked):
//    - Allows hover and editing of row values
//    - Submit button defaults to gray (disabled state)
//  - Row is changed (values edited):
//    - Submit button turns into primary color
//  - Changes submitted:
//    - Submit button turns into secondary state
//  - Row is changed again

function Row({ courseInfo }: Props) {
  const [expandCourse, setExpandCourse] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { convert, files } = useUpload(courseInfo.media);
  const { category, name: courseName, rate, description, media } = courseInfo;
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      category,
      name: courseName,
      rate,
      description,
    },
  });

  useEffect(() => {}, [files]);

  const onSubmit = handleSubmit(async (data: Record<string, any>) => {
    console.log('ROW', data);
    await convert(data.media);
    console.log('files', files);
    setSubmitted(true);
  });

  const handleDelete = () => {
    console.log(`Deleting course ${courseInfo.id}`);
  };

  const handleChange = () => {
    if (submitted) {
      setSubmitted(false);
    }
    if (changesMade) return;
    setChangesMade(true);
  };

  return (
    <form onSubmit={onSubmit} onChange={handleChange}>
      <Container onClick={() => setExpandCourse(!expandCourse)}>
        <Cell flex={2}>
          <EditableCell
            name="name"
            ref={register}
            enabled={expandCourse}
            defaultValue={courseName}
          />
        </Cell>
        <Cell flex={2}>
          <EditableCell
            ref={register}
            enabled={expandCourse}
            isCategory
            defaultValue={category}
            name="category"
          />
        </Cell>
        <Cell flex={1}>
          <EditableCell ref={register} enabled={expandCourse} defaultValue={rate} name="rate" />
        </Cell>
      </Container>
      {expandCourse && (
        <ExpandableDrawer>
          <MediaContainer ref={register} name="media" media={media} setValue={setValue} />
          <DescriptionContainer>
            <Description
              placeholder="Add a description"
              ref={register}
              name="description"
              defaultValue={description}
            />
            <StyledFlexDiv>
              <DeleteCourseButton handleClick={handleDelete} />
              <SaveCourseButton disabled={!changesMade} submitted={submitted} />
            </StyledFlexDiv>
          </DescriptionContainer>
        </ExpandableDrawer>
      )}
    </form>
  );
}

export default Row;
