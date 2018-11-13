import { getWindow } from 'utils/main';
import { CookieStorage } from 'cookie-storage';
import noop from 'lodash.noop';

const LOCAL_STORAGE = 'localStorage';
const SESSION_STORAGE = 'sessionStorage';

const mock = {
  setItem: noop,
  getItem: noop,
};

export class EnhancedCookieStorage extends CookieStorage {
  constructor(config) {
    super(config);
    this.registerPageHideEvent();
  }

  registerPageHideEvent() {
    return (
      getWindow().addEventListener &&
      getWindow().addEventListener('pagehide', () => this.clear())
    );
  }
}

export function getStorage(type) {
  try {
    const TEST_VALUE = 'test';
    getWindow().localStorage.setItem(TEST_VALUE, TEST_VALUE);
    getWindow().localStorage.removeItem(TEST_VALUE);

    return getWindow()[type];
  } catch (err) {
    return getWindow().localStorage ? new EnhancedCookieStorage() : mock;
  }
}

export const LocalStorage = getStorage(LOCAL_STORAGE);
export const SessionStorage = getStorage(SESSION_STORAGE);
