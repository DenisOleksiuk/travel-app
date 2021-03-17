import {
  createStore,
  applyMiddleware
} from 'redux';
import reducer from './reducers';

const stringMiddleWare = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    });
  }

  return next(action);
};

const store = createStore(reducer, applyMiddleware(stringMiddleWare));

store.dispatch('HELLO_WORLD');

export {
  store
};
