import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignupForm from 'components/SignupForm'

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        SignupPage
        <SignupForm />
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
)(SignupPage);
