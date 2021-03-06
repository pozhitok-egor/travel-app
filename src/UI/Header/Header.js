import React from 'react';
import styled from 'styled-components';

const Header = (props) => {
  const { children } = props
  return (
    <HeaderBlock>
      <Logo>Travel App</Logo>
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
  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`;
