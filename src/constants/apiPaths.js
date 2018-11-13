import { buildApiPath } from 'utils';

export const getOauthTokenPath = buildApiPath(() => '/oauth/token');
export const getCurrentUserPath = buildApiPath(() => '/api/v1/users/me');

