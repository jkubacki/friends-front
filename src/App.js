import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import Homepage from 'views/Homepage'
import './App.css';
import {
  getUserInfo as getUserInfoAction,
  markAsNotLoggedUser as markAsNotLoggedUserAction,
} from 'actions/auth';
import { getStorageItem} from 'utils';

import { Route } from 'components/navigation';

class App extends Component {
  componentWillMount() {
    this.getUserDataIfLoggedIn();
  }

  getUserDataIfLoggedIn() {
    const { getUserInfo, markAsNotLoggedUser } = this.props;
    const token = getStorageItem('token');

    if (token) {
      getUserInfo();
    } else {
      markAsNotLoggedUser();
    }
  }

  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          component={Homepage}
        />
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    {
      getUserInfo: getUserInfoAction,
      markAsNotLoggedUser: markAsNotLoggedUserAction,
    },
  ),
  withRouter,
)(App);
