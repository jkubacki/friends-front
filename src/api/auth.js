import axios from 'axios';

import { post } from 'api';

import {
  getOauthTokenPath,
  getOauthRevokePath,
  getUsersPath,
  getConfirmEmailPath
} from 'constants/apiPaths';
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

export function sendSocialLoginRequest(params) {
  return sendTokenRequest({
    grant_type: 'assertion',
    rememberMe: true,
    ...params,
  });
}

export function sendLogoutRequest() {
  const token = getStorageItem('token');

  return new Promise((resolve, reject) => {
    axios
      .post(
        getOauthRevokePath(),
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        LocalStorage.removeItem('rememberMe');
        LocalStorage.removeItem('token');
        LocalStorage.removeItem('refresh_token');
        SessionStorage.removeItem('token');
        SessionStorage.removeItem('refresh_token');
        resolve();
      })
      .catch(reject);
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

export function sendSignUpRequest({
  email,
  password,
  password_confirmation,
}) {
  return post(getUsersPath(), {
    'data[type]': 'users',
    'data[attributes][email]': email,
    'data[attributes][password]': password,
    'data[attributes][password_confirmation]': password_confirmation,
  });
}

export function sendEmailConfirmationRequest({ confirmationToken }) {
  return post(getConfirmEmailPath(), {
    'data[type]': 'users',
    'data[attributes][confirmation_token]': confirmationToken,
  });
}
