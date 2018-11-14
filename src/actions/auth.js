import { SubmissionError } from 'redux-form';
import { push } from 'connected-react-router';

import { dispatchRequest } from 'actions';
import { getHomePath } from 'constants/paths'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_MY_USER_REQUEST,
  GET_MY_USER_SUCCESS,
  GET_MY_USER_FAILURE,
  MARK_AS_NOT_LOGGED_USER,
} from 'actionTypes';
import {
  sendLoginRequest,
  sendLogoutRequest,
  requestUserInfo,
} from 'api/auth';

export function login(params) {
  return dispatchRequest({
    requestAction: LOGIN_REQUEST,
    request: () => sendLoginRequest(params),
    onSuccess: (dispatch, data, getState) => {
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(push(getHomePath()));
    },
    onFailure: (dispatch, error) => {
      dispatch({ type: LOGIN_FAILURE });

      if (error.response.data.error === 'invalid_grant') {
        throw new SubmissionError({
          email: 'errors.invalidLoginOrPassword',
          password: 'errors.invalidLoginOrPassword',
        });
      }
    },
  });
}

export function logout() {
  return dispatchRequest({
    requestAction: LOGOUT_REQUEST,
    request: sendLogoutRequest,
    onSuccess: dispatch => {
      dispatch(push(getHomePath()));
      dispatch({ type: LOGOUT_SUCCESS });
    },
    onFailure: LOGOUT_FAILURE,
  });
}

export function getUserInfo() {
  return dispatchRequest(
    {
      requestAction: GET_MY_USER_REQUEST,
      request: requestUserInfo,
      onSuccess: (dispatch, data) => {
        dispatch({ type: GET_MY_USER_SUCCESS });
        dispatch({ type: LOGIN_SUCCESS, payload: data });
      },
      onFailure: GET_MY_USER_FAILURE,
    },
    { returnFailure: true, returnSuccess: true },
  );
}

export function markAsNotLoggedUser() {
  return { type: MARK_AS_NOT_LOGGED_USER };
}
