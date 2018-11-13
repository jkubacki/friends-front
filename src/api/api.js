import axios from 'axios';
import queryString from 'query-string';
import { getStorageItem } from 'utils';
import { refreshTokens } from 'api/auth';
import axiosCancel from 'axios-cancel';

axiosCancel(axios);

export function getHeaders() {
  const token = getStorageItem('token');
  const headers = {
    Accept: 'application/vnd.api+json',
    'Cache-Control': 'no-cache',
    'Source-App': 'web',
  };

  if (!token) return headers;

  return {
    ...headers,
    Authorization: token && `Bearer ${token}`,
  };
}

export function getFormHeaders() {
  return { 'Content-Type': 'application/x-www-form-urlencoded' };
}

function mergeConfig(config = {}, additionalHeaders = {}) {
  return {
    ...config,
    headers: {
      ...config.headers,
      ...getHeaders(),
      ...additionalHeaders,
    },
  };
}

function apiAction(callback, additionalHeaders) {
  return (
    path,
    params,
    config = {},
    { stringifyParams = true, stringifyOptions = {} } = {},
  ) => {
    const token = getStorageItem('token');
    const originalMergedConfig = mergeConfig(config, additionalHeaders);
    const formattedParams = stringifyParams
      ? queryString.stringify(params, stringifyOptions)
      : params;

    if (token) {
      return callback(path, formattedParams, originalMergedConfig).catch(e => {
        if (axios.isCancel(e)) {
          throw e;
        }

        return refreshTokens().then(() =>
          callback(
            path,
            formattedParams,
            mergeConfig(config, additionalHeaders),
          ),
        );
      });
    }

    return callback(path, formattedParams, originalMergedConfig);
  };
}

export function get(path, config, options) {
  return apiAction((newPath, newParams, newConfig) =>
    axios.get(newPath, newConfig),
  )(path, null, config, options);
}

export function patch(path, params, config, options) {
  return apiAction(axios.patch, getFormHeaders())(
    path,
    params,
    config,
    options,
  );
}

export function post(path, params, config, options) {
  return apiAction(axios.post, getFormHeaders())(path, params, config, options);
}

export function apiDelete(path, config, options) {
  return apiAction((newPath, newParams, newConfig) =>
    axios.delete(newPath, newConfig),
  )(path, null, config, options);
}

export function withPositionTracking(rowName, rowIndex) {
  return config => ({
    ...config,
    params: {
      rowName,
      rowIndex,
    },
  });
}
