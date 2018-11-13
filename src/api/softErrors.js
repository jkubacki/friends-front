export const ALLOW_SUCCESS_WHEN_ERRORS = 'allowSuccessWhenErrors';
export const ERROR_TYPE = 'error';
export const RESPONSES_KEY = 'responses';
export const SOFT_ERRORS_KEY = 'areSoftErrors';
export const SUCCESS_TYPE = 'success';

function responseFromSoftErrors(responses = [], searchedType) {
  return responses
    .filter(({ type }) => type === searchedType)
    .map(({ response }) => response);
}

export function areSoftErrorsResponse(response = {}) {
  return !!response[SOFT_ERRORS_KEY];
}

export function errorResponsesFromSoftErrors(responses) {
  return responseFromSoftErrors(responses, ERROR_TYPE);
}

export function execSuccessWhenErrors(responses) {
  return !!responses[ALLOW_SUCCESS_WHEN_ERRORS];
}

export function getSoftErrorsResponses(response = {}) {
  return response[RESPONSES_KEY];
}

export function softErrors(request) {
  return request.then(
    response => ({ response, type: SUCCESS_TYPE }),
    response => ({ response, type: ERROR_TYPE }),
  );
}

export function handlePromisesWithSoftErrors(
  requests,
  { allowSuccessWhenErrors = true } = {},
) {
  return Promise.all(requests.map(softErrors)).then(responses => ({
    [RESPONSES_KEY]: responses,
    [ALLOW_SUCCESS_WHEN_ERRORS]: allowSuccessWhenErrors,
    [SOFT_ERRORS_KEY]: true,
  }));
}

export function successResponsesFromSoftErrors(responses) {
  return responseFromSoftErrors(responses, SUCCESS_TYPE);
}
