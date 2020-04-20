import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout/ProfilePageLayout';
import Subsection from '../components/Layout/AddCourseSubsection';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducer';
import { useForm } from 'react-hook-form';
import { postCourse } from '../redux/UserState/userSlice';

// const Container = styled.div``;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;
`;

const CategoryPlaceholder = styled.div`
  width: 150px;
  height: 150px;
  background-color: hsla(120, 100%, 25%, 0.3);

  /* opacity: 0.3; */
`;

const AddCourse = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.app.categories);
  const { handleSubmit, register } = useForm();
  const [selected, setSelected] = useState('');

  const onSubmit = (data: any) => {
    console.log('selected Category', selected);
    console.log(data);
    dispatch(postCourse(data));
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Subsection title="Category">
          <CategoryGrid>
            {categories.map(category => (
              <CategoryPlaceholder onClick={() => setSelected(category)}>
                {category}
              </CategoryPlaceholder>
            ))}
          </CategoryGrid>
        </Subsection>
        <Subsection title="Title">
          <input type="text" name="title" ref={register} />
        </Subsection>
        <Subsection title="Description">
          <input type="text" name="description" ref={register} />
        </Subsection>
        <Subsection title="Rate">
          <input type="number" name="rate" ref={register} />
        </Subsection>
        <Subsection title="Media">
          <input type="button" name="" value="Upload Media" />
        </Subsection>
        <input type="submit" />
      </form>
    </Layout>
  );
};

export default AddCourse;
