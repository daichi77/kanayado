import { combineReducers } from 'redux';
import postTour from './postTourReducer';
import postLodging from './postLodgingReducer';
import filterText from './filterText';
import modalIsOpen from './modalIsOpen';

const rootReducer = combineReducers({
  postTour,
  postLodging,
  filterText,
  modalIsOpen,
});

export default rootReducer;
