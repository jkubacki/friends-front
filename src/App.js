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
import { Switch } from 'react-router'
import { getHomePath, getLoginPath, getSignupPath } from 'constants/paths';

import AppHeader from 'components/AppHeader'
import LoginPage from 'views/LoginPage'
import SignupPage from 'views/SignupPage'

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
        <AppHeader />
        <Switch>
          <Route
            path={getHomePath()}
            exact
            component={Homepage}
          />
          <Route
            path={getLoginPath()}
            exact
            component={LoginPage}
          />
          <Route
            path={getSignupPath()}
            exact
            component={SignupPage}
          />
        </Switch>
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
