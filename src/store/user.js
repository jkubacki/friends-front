import { LOGIN_SUCCESS, MARK_AS_NOT_LOGGED_USER } from 'actionTypes';
import UserState from 'constants/userState';

const initialState = {
  id: null,
  state: UserState.FETCHING
};

function loginSuccess(payload) {
  const [userData] = payload;
  const {
    data: { id: userId },
  } = userData;

  return {
    id: userId,
    state: UserState.LOGGED_IN,
  };
}

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS:
      return loginSuccess(payload);
    case MARK_AS_NOT_LOGGED_USER:
      return {
        ...state,
        id: null,
        state: UserState.NOT_LOGGED_IN,
      };
    default:
      return state;
  }
}
