import { SubmissionError } from 'redux-form';
import { dispatchRequest } from 'actions';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from 'actionTypes';
import {
  sendLoginRequest,
} from 'api/auth';

export function login(params) {
  return dispatchRequest({
    requestAction: LOGIN_REQUEST,
    request: () => sendLoginRequest(params),
    onSuccess: (dispatch, data, getState) => {
      dispatch({ type: LOGIN_SUCCESS, payload: data });

      // visitAfterLogin({
      //   currentState: getState(),
      //   dispatch,
      // });
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
