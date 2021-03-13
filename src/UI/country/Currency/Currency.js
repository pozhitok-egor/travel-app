import React from 'react'
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

const Currency = (props) => {
  return (
    <div>
      {props.t('сurrency')}
    </div>
  )
}

export default connect(null, null)(withNamespaces()(Currency));
