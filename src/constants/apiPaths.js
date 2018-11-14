import { buildApiPath } from 'utils';

export const getOauthTokenPath = buildApiPath(() => '/oauth/token');
export const getOauthRevokePath = buildApiPath(() => '/oauth/revoke');
export const getCurrentUserPath = buildApiPath(() => '/api/v1/users/me');
export const getUsersPath = buildApiPath(
  id => (id ? `/api/v1/users/${id}` : '/api/v1/users'),
);

