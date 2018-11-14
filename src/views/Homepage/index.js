import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        Homepage
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    {},
  ),
  withRouter,
)(Homepage);
