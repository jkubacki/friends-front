import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import LoginForm from 'components/LoginForm';
import { socialLogin } from 'actions/auth';
import { extractProps } from 'utils';

class LoginPage extends React.Component {
  render() {
    const { googleLogin } = this.props;
    const {
      REACT_APP_GOOGLE_CLIENT_ID,
      REACT_APP_GOOGLE_OAUTH_SCOPES,
    } = process.env;

    return (
      <div>
        <LoginForm />
        <GoogleLogin
          clientId={REACT_APP_GOOGLE_CLIENT_ID}
          responseType="code"
          scope={REACT_APP_GOOGLE_OAUTH_SCOPES}
          onSuccess={googleLogin}
          tag="span"
        />
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    { socialLogin },
  ),
  withRouter,
  extractProps(props => ({
    googleLogin: ({ code }) =>
      props.socialLogin({ provider: 'google', assertion: code }),
  })),
)(LoginPage);
