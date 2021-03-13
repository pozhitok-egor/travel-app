import React from 'react'
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

const Gallery = (props) => {
  return (
    <div>
      {props.t('gallery')}
    </div>
  )
}

export default connect(null, null)(withNamespaces()(Gallery));
