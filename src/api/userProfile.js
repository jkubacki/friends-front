import { getCurrentUserPath } from 'constants/apiPaths';
import { get } from 'api';

export function getUserProfile() {
  return get(getCurrentUserPath(), {
    params: {},
  });
}
