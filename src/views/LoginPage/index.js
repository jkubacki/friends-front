import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginForm from 'components/LoginForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <LoginForm />
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
)(LoginPage);
