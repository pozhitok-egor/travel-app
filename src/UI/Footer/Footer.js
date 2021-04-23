import React from 'react';
import styled from 'styled-components';
import rsschoolIcon from '../../assets/icons/rs_school.svg';
import githubIcon from '../../assets/icons/github.svg';

const Footer = () => {
  return (
    <FooterBlock>
      <a href="https://rs.school/js/">
        <img src={rsschoolIcon} alt="RS School" />
      </a>
      <Date>2021</Date>
      <Contacts>
        <List>
          <li>
            <a href="https://github.com/koljn12345"><img src={githubIcon}alt="koljn12345 github account"/> koljn12345</a>
          </li>
          <li>
            <a href="https://github.com/wayjewish"><img src={githubIcon}alt="wayjewish github account"/> wayjewish</a>
          </li>
        </List>
        <List>
          <li>
            <a href="https://github.com/pozhitok-egor"><img src={githubIcon}alt="pozhitok-egor github account"/> pozhitok-egor</a>
          </li>
          <li>
            <a href="https://github.com/George-victorious"><img src={githubIcon}alt="George-victorious github account"/> George-victorious</a>
          </li>
        </List>
      </Contacts>
    </FooterBlock>
  )
};

export default Footer;

const FooterBlock = styled.div`
  position: absolute;
  padding: 10px 20px;
  bottom: 0;
  display: flex;
  width: calc(100% - 40px);
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Date = styled.p`
  margin: 0 auto;
  @media (max-width: 500px) {
    margin: 10px auto;
  }
`;

const List = styled.ul`
  margin: 0;
  padding-left: 20px;
  list-style: none;
  & li {
    &:first-child {
      margin-bottom: 10px;
    }
    & a {
      display: flex;
      align-items: center;
      color: #262328;
      text-decoration: none;
      & img {
        margin: 0 10px 0 0;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
  @media (max-width: 500px) {
    margin: 5px;
  }
`;

const Contacts = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
