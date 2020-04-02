/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  box-shadow: ${p => p.boxShadow || '0px 10px 23px 0px rgba(0, 0, 0, 0.2)'};
  margin: ${p => p.m};
  padding: ${p => p.p};
  flex: ${p => p.f};
  height: ${p => p.h};
  width: ${p => p.w};
  display: ${p => p.isFlex && 'flex'};
  justify-content: ${p => p.justify};
  align-items: ${p => p.align};
  flex-direction: ${p => p.flexDirection};
  ${p => p.center && 'display: flex; justify-content: center; align-items: center;'};
`;

function Card({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}

Card.propTypes = {
  h: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // height
  w: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // width
  m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // margin
  p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // padding
  f: PropTypes.number, // flex
  center: PropTypes.bool, // align-items && justify-content center
  boxShadow: PropTypes.string,
  className: PropTypes.string,
  flexDirection: PropTypes.oneOf(['row, column']),
  align: PropTypes.string,
  justify: PropTypes.string,
};

export default Card;
