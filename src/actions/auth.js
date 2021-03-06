import { SubmissionError } from 'redux-form';
import { goBack, push } from 'connected-react-router';

import { dispatchRequest } from 'actions';
import { getHomePath, getLoginPath } from 'constants/paths'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GET_MY_USER_REQUEST,
  GET_MY_USER_SUCCESS,
  GET_MY_USER_FAILURE,
  MARK_AS_NOT_LOGGED_USER,
  CONFIRM_EMAIL_REQUEST,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
} from 'actionTypes';
import {
  requestUserInfo,
  sendLoginRequest,
  sendSocialLoginRequest,
  sendLogoutRequest,
  sendSignUpRequest,
  sendEmailConfirmationRequest,
} from 'api/auth';
import { RequestError } from 'api/errors';

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

export function socialLogin(params) {
  return dispatchRequest(
    {
      requestAction: LOGIN_REQUEST,
      request: () => sendSocialLoginRequest(params),
      onSuccess: (dispatch, data, getState) => {
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        dispatch(push(getHomePath()));
      },
      onFailure: LOGIN_FAILURE,
    },
    { returnSuccess: true, returnFailure: true },
  );
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

export function signUp(params) {
  return dispatchRequest({
    requestAction: SIGNUP_REQUEST,
    request: () => sendSignUpRequest(params),
    onSuccess: dispatch => {
      dispatch({ type: SIGNUP_SUCCESS });
      dispatch(goBack());
    },
    onFailure: SIGNUP_FAILURE,
  });
}

export function confirmEmail(params) {
  return dispatchRequest({
    requestAction: CONFIRM_EMAIL_REQUEST,
    request: () => sendEmailConfirmationRequest(params),
    onSuccess: (dispatch, data) => {
      dispatch({ type: CONFIRM_EMAIL_SUCCESS });
      dispatch(push(getLoginPath()));
    },
    onFailure: new RequestError(CONFIRM_EMAIL_FAILURE),
  });
}
