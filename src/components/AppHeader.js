import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AppHeader extends React.Component {
  render() {
    return (
      <div>AppHeader</div>
    )
  }
}

export default compose(
  connect(
    null,
    {},
  ),
  withRouter,
)(AppHeader);
