import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from 'components/LoginForm';

class AppHeader extends React.Component {
  render() {
    return (
      <div>
        AppHeader
        <LoginForm></LoginForm>
      </div>
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
