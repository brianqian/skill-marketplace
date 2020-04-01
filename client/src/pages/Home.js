import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2rem 8rem;
`;

const SearchField = styled.form`
  display: flex;
  padding: 1rem;
  input {
    border-radius: 5px;
    min-height: 30px;
    border: 1px solid #aaa;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding: 0.5rem;
  }
  select {
    border: 1px solid #aaa;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const Results = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3rem;
`;

function Home() {
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <Container>
      <h1>Learning for anyone, anywhere</h1>
      <SearchField onSubmit={handleSubmit}>
        <input type="text" placeholder="What do you want to learn?" />
        <select name="" id="">
          <option value="">All Skills</option>
          <option value="">Category 1</option>
          <option value="">Category 2</option>
          <option value="">Category 3</option>
        </select>
      </SearchField>
      <Results>
        {Array(10)
          .fill()
          .map(() => (
            <Card />
          ))}
      </Results>
    </Container>
  );
}

export default Home;
