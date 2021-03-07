import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = (props) => {
  const { children } = props
  return (
    <HeaderBlock>
      <Link to="/"><Logo>Travel App</Logo></Link>
      {children}
    </HeaderBlock>
  )
};

export default Header;

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin: 0 auto;
  width: calc(100% - 40px);
  & :only-child {
    margin: 0 auto;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
  font-family: 'Pacifico', cursive;
  font-size: 32px;
  color: #262328;
  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`;
