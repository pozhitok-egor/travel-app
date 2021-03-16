import React from 'react';
import styled from 'styled-components';

const Content = (props) => {
  const { children } = props;
  return (
    <MainBlock>
      {children}
    </MainBlock>
  )
}

export default Content;

const MainBlock = styled.div`
  display: flex;
  padding: 10px 20px 80px 20px;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 500px) {
    padding-bottom: 250px;
  }
`;
