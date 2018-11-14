import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import UserState from 'constants/userState';
import UserSection from 'components/UserSection';
import NotLoggedUserPanel from 'components/NotLoggedUserPanel';

function AppHeader({ isLoggedIn }) {
  return (
    <nav>
      <Link to="/">
        Home
      </Link>
      <ul>
        {isLoggedIn && <UserSection />}
        {!isLoggedIn && <NotLoggedUserPanel />}
      </ul>
    </nav>
  )
}

export default compose(
  withRouter,
  connect(({ user }) => ({
    isLoggedIn: user.state === UserState.LOGGED_IN,
  })),
)(AppHeader);
