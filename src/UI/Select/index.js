import React from 'react'
import { connect } from 'react-redux';
import { fetchLanguage } from '../../store/actions';
import i18n from '../../i18n';
import styled from 'styled-components';

const User = (props) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    props.fetchLanguage(lng)
  }
  return (
    <Select value={props.lang} onChange={(event) => changeLanguage(event.target.value)}>
      <option value="ru">RU</option>
      <option value="en">EN</option>
      <option value="cz">CZ</option>
    </Select>
  )
}

const Select = styled.select`
  outline: none;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  padding: 5px;
  border-radius: 5px;
  background: #147FEB;
  color: #EFF2F3;
  border: none;
`;

const mapStateToProps = (state) => {
  return {
    lang: state.language
  }
}

const mapDispatchToProps = {
  fetchLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
