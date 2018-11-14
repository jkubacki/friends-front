import { LOGIN_SUCCESS } from 'actionTypes';
import UserState from 'constants/userState';

const initialState = {
  id: null,
  state: UserState.FETCHING
};

function loginSuccess(payload) {
  const [userData] = payload;
  const {
    data: { id: userId, attributes },
  } = userData;

  return {
    id: userId,
    state: UserState.LOGGED_IN,
  };
}

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS:
      console.log('success');
      return loginSuccess(payload);
    default:
      return state;
  }
}
