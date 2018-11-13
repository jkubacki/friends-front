import { ErrorArray } from 'api/errors';
import {
  areSoftErrorsResponse,
  errorResponsesFromSoftErrors,
  execSuccessWhenErrors,
  getSoftErrorsResponses,
  successResponsesFromSoftErrors,
} from 'api/softErrors';
import { NON_THROWN_ERROR_KEY } from 'constants/index';

function handleSuccess(dispatch, onSuccess, getState, returnSuccess) {
  return response => {
    const isArray = Array.isArray(response);

    if (isArray) {
      const errors = response
        .filter(item => item[NON_THROWN_ERROR_KEY])
        .map(item => item[NON_THROWN_ERROR_KEY]);

      if (errors.length) {
        throw new ErrorArray(errors);
      }
    }

    const data = isArray ? response : response && response.data;

    if (typeof onSuccess === 'function') {
      onSuccess(dispatch, data, getState);
    } else if (Array.isArray(onSuccess)) {
      onSuccess.forEach(type => {
        dispatch({ type, payload: data });
      });
    } else {
      dispatch({ type: onSuccess, payload: data });
    }
    if (returnSuccess) {
      return Promise.resolve(response);
    }
    return true;
  };
}

function handleFailure(dispatch, onFailure, getState, returnFailure) {
  return error => {
    if (typeof onFailure === 'function') {
      onFailure(dispatch, error, getState);
    } else if (onFailure instanceof Error) {
      const requestError = onFailure;
      dispatch({ type: requestError.type, payload: error });
      throw requestError.setBase(error);
    } else if (Array.isArray(onFailure)) {
      onFailure.forEach(type => {
        dispatch({ type, payload: error });
      });
    } else if (typeof onFailure === 'object') {
      dispatch(onFailure);
    } else {
      dispatch({ type: onFailure, payload: error });
    }
    if (returnFailure) {
      return Promise.reject(error);
    }
    return true;
  };
}

function handleSuccessWithSoftErrors(
  dispatch,
  onSuccess,
  getState,
  returnSuccess,
) {
  return softErrorResponse => {
    const allowSuccess = execSuccessWhenErrors(softErrorResponse);
    const responses = getSoftErrorsResponses(softErrorResponse);
    const successResponses = successResponsesFromSoftErrors(responses);
    const errorResponses = errorResponsesFromSoftErrors(responses);
    const hasErrors = errorResponses.length;
    const hasErrorsWithoutSuccess = hasErrors && !successResponses.length;
    const shouldHandleSuccess = allowSuccess || !hasErrors;

    if (!hasErrorsWithoutSuccess && shouldHandleSuccess) {
      handleSuccess(dispatch, onSuccess, getState, returnSuccess)(
        successResponses,
      );
    }

    if (hasErrors) {
      throw new ErrorArray(errorResponses);
    }
  };
}

function selectHandleSuccessMethod(
  dispatch,
  onSuccess,
  getState,
  returnSuccess,
) {
  return response => {
    if (areSoftErrorsResponse(response)) {
      return handleSuccessWithSoftErrors(
        dispatch,
        onSuccess,
        getState,
        returnSuccess,
      )(response);
    }

    return handleSuccess(dispatch, onSuccess, getState, returnSuccess)(
      response,
    );
  };
}

export function dispatchRequest(
  { request, requestAction, onSuccess, onFailure },
  { returnSuccess, returnFailure } = {},
) {
  return (dispatch, getState) => {
    dispatch(
      typeof requestAction === 'object'
        ? requestAction
        : { type: requestAction },
    );

    return request(getState)
      .then(
        selectHandleSuccessMethod(dispatch, onSuccess, getState, returnSuccess),
      )
      .catch(handleFailure(dispatch, onFailure, getState, returnFailure));
  };
}
