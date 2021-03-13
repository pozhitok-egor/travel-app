import React from 'react'
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

const Description = (props) => {
  return (
    <div>
      {props.t('description')}
    </div>
  )
}

export default connect(null, null)(withNamespaces()(Description));
