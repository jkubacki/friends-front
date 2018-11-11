import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { reducer as formReducer } from 'redux-form';

const history = isWindowUndefined() ? createMemoryHistory() : createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
});

const composeEnhancers =
  // eslint-disable-next-line no-underscore-dangle
  getWindow().__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, historyMiddleware)),
);

export { history };
