import React from 'react';
import styled from 'styled-components';

const Container = (props) => {
  const { children } = props
  return (
    <ContainerBlock>
      {children}
    </ContainerBlock>
  )
};

export default Container;

const ContainerBlock = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1020px;
  min-height: 100vh;
`;
