import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './src/Reducers/index';
import Drawer from './src/drawer';
import { getPostsTour } from './src/Actions/getPostsTour';
import { getPostsLodging } from './src/Actions/getPostsLodging';

const AppContainer = createAppContainer(Drawer);

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger),
);

const doEverything = () => {
  return dispatch => Promise.all([
    dispatch(getPostsTour()),
    dispatch(getPostsLodging()),
  ]);
};

store.dispatch(doEverything());

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
