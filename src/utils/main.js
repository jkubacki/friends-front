import { LocalStorage, SessionStorage } from 'utils/storage';

export function isWindowUndefined() {
  return typeof window === 'undefined';
}
export function getWindow() {
  return isWindowUndefined() ? {} : window;
}

export function buildApiPath(getPathFunction) {
  const baseUrl = "http://localhost:3000"; // process.env.REACT_APP_API_BASE_URL;

  return (...args) => `${baseUrl}${getPathFunction(...args)}`;
}

export function getStorageItem(key) {
  if (isWindowUndefined()) {
    return undefined;
  }

  return LocalStorage.getItem(key) || SessionStorage.getItem(key);
}
