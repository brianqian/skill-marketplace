import React from 'react';
import styled from 'styled-components';
import Star from './Icons/Star';

const Container = styled.div`
  height: 350px;
  width: 300px;
  box-shadow: 0px 10px 23px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  padding: 1rem;
  flex: 6;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & + div {
    flex: 1;
    border-top: 1px solid #aaa;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    text-transform: uppercase;
    color: ${p => p.theme.color.gray};
    font-weight: 600;
  }
`;

const Avatar = styled.div`
  width: 95px;
  height: 95px;
  border-radius: 50px;
  background-color: ${p => p.theme.color.primary};
  margin: 1rem 0;
  flex: 2;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

function Card({ name, classTitle, rating = 3, rate }) {
  const starCount = Math.round(rating);

  return (
    <Container>
      <Content>
        <Avatar />
        <Text>
          <p>Name</p>
          <h3 title={classTitle}>Class</h3>
          <div>
            {Array(5)
              .fill()
              .map((star, i) => {
                return <Star isActive={i < starCount} size={12} />;
              })}
          </div>
          <p>Rate</p>
        </Text>
      </Content>
      <div>Send Message</div>
    </Container>
  );
}

export default Card;
