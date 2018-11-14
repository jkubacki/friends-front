import { SubmissionError } from 'redux-form';
import { dispatchRequest } from 'actions';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_MY_USER_REQUEST,
  GET_MY_USER_SUCCESS,
  GET_MY_USER_FAILURE,
  MARK_AS_NOT_LOGGED_USER,
} from 'actionTypes';
import {
  sendLoginRequest,
  requestUserInfo,
} from 'api/auth';

export function login(params) {
  return dispatchRequest({
    requestAction: LOGIN_REQUEST,
    request: () => sendLoginRequest(params),
    onSuccess: (dispatch, data, getState) => {
      dispatch({ type: LOGIN_SUCCESS, payload: data });
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
