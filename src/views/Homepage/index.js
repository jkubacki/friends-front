import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppHeader from 'components/AppHeader';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
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
