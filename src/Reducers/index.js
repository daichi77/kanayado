import { combineReducers } from 'redux';
import postTour from './postTourReducer';
import postLodging from './postLodgingReducer';
import filterText from './filterText';
import modalIsOpen from './modalIsOpen';
import hotelData from './hotelData';

const rootReducer = combineReducers({
  postTour,
  postLodging,
  filterText,
  modalIsOpen,
  hotelData,
});

export default rootReducer;
