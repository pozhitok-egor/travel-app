import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import searchIcon from '../../../assets/icons/search.svg';
import { search } from '../../../store/actions';

const Search = (props) => {
  return (
    <SearchBlock onSubmit={(e) => e.preventDefault()}>
      <Input type="search" onChange={(e) => props.search(e.target.value)} placeholder="Search" autocomplete="off" autoFocus/>
      <Icon src={searchIcon} alt="Search"/>
    </SearchBlock>
  )
}

const mapDispatchToProps = {
  search
}

export default connect(null, mapDispatchToProps)(Search);

const SearchBlock = styled.form`
  display: flex;
  padding: 5px 20px;
  border-radius: 50px;
  background-color: #147FEB;
`;

const Icon = styled.img`
  margin-left: 10px;
  cursor: pointer;
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
