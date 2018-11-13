import axios from 'axios';

import { getOauthTokenPath } from 'constants/apiPaths';
import { LocalStorage, SessionStorage } from 'utils/storage';
import { getStorageItem } from 'utils';
import { getUserProfile } from 'api/userProfile';

function persistTokens(data) {
  const rememberMe = LocalStorage.getItem('rememberMe');
  const storage = rememberMe === 'true' ? LocalStorage : SessionStorage;

  storage.setItem('token', data.access_token);
  storage.setItem('refresh_token', data.refresh_token);
}

export function requestUserInfo() {
  return getUserProfile().then(({ data: userData }) => {
    return Promise.all([userData]);
  });
}

export function sendTokenRequest({ rememberMe = false, ...params }) {
  return axios
    .post(getOauthTokenPath(), params)
    .then(response => {
      if (rememberMe) {
        LocalStorage.setItem('rememberMe', rememberMe);
      }
      persistTokens(response.data);

      return response;
    })
    .then(requestUserInfo);
}

export function sendLoginRequest(params) {
  return sendTokenRequest({
    grant_type: 'password',
    ...params,
  });
}

export function refreshTokens() {
  const refreshToken = getStorageItem('refresh_token');

  return axios
    .post(getOauthTokenPath(), {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
    .then(response => {
      persistTokens(response.data);

      return response;
    });
}
