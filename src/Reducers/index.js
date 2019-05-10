import { combineReducers } from 'redux';
import postTour from './postTourReducer';
import postLodging from './postLodgingReducer';

const rootReducer = combineReducers({
  postTour,
  postLodging,
});

export default rootReducer;
