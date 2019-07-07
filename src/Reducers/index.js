import { combineReducers } from 'redux';
import postTour from './postTourReducer';
import postLodging from './postLodgingReducer';
import filterText from './filterText';

const rootReducer = combineReducers({
  postTour,
  postLodging,
  filterText,
});

export default rootReducer;
