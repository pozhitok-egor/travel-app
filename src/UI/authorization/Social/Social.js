import React from 'react'
import styled from 'styled-components';
import githubIcon from '../../../assets/icons/github.svg';

const Social = () => {
  return (
    <SocialBlock>
      <h1>Or login with:</h1>
      <Icons>
        <a href="https://github.com/login/oauth/authorize?client_id=146d03d9499f8869d11e"><SocialIcon src={githubIcon} alt='github'/></a>
      </Icons>
    </SocialBlock>
  )
}

const SocialBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px
`;

const Icons = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialIcon = styled.img`
  height: 40px;
  width: 40px;
`;

export default Social;
