import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserSection from 'components/UserSection';
import LoginForm from 'components/LoginForm';
import UserState from 'constants/userState';

function AppHeader({ isLoggedIn }) {
  return (
    <div>
      AppHeader
      {isLoggedIn && <UserSection />}
      {!isLoggedIn && <LoginForm />}
    </div>
  )
}

export default compose(
  withRouter,
  connect(({ user }) => ({
    isLoggedIn: user.state === UserState.LOGGED_IN,
  })),
)(AppHeader);
