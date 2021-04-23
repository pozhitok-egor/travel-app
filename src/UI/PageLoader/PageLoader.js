import React from 'react';
import styled from 'styled-components';
import loader from '../../assets/loader.gif';

export const PageLoader = (props) => {
  return (
    <LoaderBlock>
      <LoaderImage src={loader} alt="loader"/>
    </LoaderBlock>
  )
}

const LoaderBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderImage = styled.img`
  width: 100px;
  animation: rotate 4s infinite linear;
  @keyframes rotate {
    from {transform: rotate(0deg);}
    50% {transform: rotate(180deg);}
    to {transform: rotate(360deg);}
  }
`;
