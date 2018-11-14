import React, { Fragment} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from 'actions/auth';

class UserSection extends React.Component {

  handleLogout = this.props.logout;

  render() {
    return (
      <Fragment>
        <li>UserSection</li>
        <li>
          <button onClick={this.handleLogout}>Log out</button>
        </li>
      </Fragment>
    )
  }
}

export default compose(
  connect(
    null,
    { logout },
  ),
)(UserSection);
