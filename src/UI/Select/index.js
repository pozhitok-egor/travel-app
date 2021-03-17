import React from 'react'
import { connect } from 'react-redux';
import { fetchLanguage } from '../../store/actions';
import i18n from '../../i18n';

const User = (props) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    props.fetchLanguage(lng)
  }
  return (
    <select value={props.lang} onChange={(event) => changeLanguage(event.target.value)}>
      <option value="ru">RU</option>
      <option value="en">EN</option>
      <option value="cz">CZ</option>
    </select>
  )
}

const mapStateToProps = (state) => {
  return {
    lang: state.language
  }
}

const mapDispatchToProps = {
  fetchLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
