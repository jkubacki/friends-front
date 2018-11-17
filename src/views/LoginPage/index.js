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
    const google_client = '793164866667-ftl6g4gfa12b4oqathoc56gu6kc46gah.apps.googleusercontent.com'
    const google_scopes = 'profile email https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me'
    const { googleLogin } = this.props;

    return (
      <div>
        <LoginForm />
        <GoogleLogin
          clientId={google_client}
          responseType="code"
          scope={google_scopes}
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
