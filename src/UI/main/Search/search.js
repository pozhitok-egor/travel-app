import React from 'react';
import styled from 'styled-components';
import searchIcon from '../../../assets/icons/search.svg';

const Search = (props) => {
  return (
    <SearchBlock>
      <Input type="search" placeholder="Search" autocomplete="off" autoFocus/>
      <Icon src={searchIcon} alt="Search"/>
    </SearchBlock>
  )
}

export default Search;

const SearchBlock = styled.form`
  display: flex;
  padding: 5px 20px;
  border-radius: 50px;
  background-color: #147FEB;
`;

const Icon = styled.img`
  margin-left: 10px;
  cursor: none;
`;

const Input = styled.input`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  color: #EFF2F3;
  &::-webkit-input-placeholder {
    color: #EFF2F3;
  }
`;
