import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getLoginPath, getSignupPath } from 'constants/paths';

class NotLoggedUserPanel extends React.Component {
  render() {
    return (
      <Fragment>
        <li>
          <Link to={getLoginPath()}>
            Login
          </Link>
        </li>
        <li>
          <Link to={getSignupPath()}>
            Signup
          </Link>
        </li>
      </Fragment>
    );
  }
}

export default NotLoggedUserPanel;
