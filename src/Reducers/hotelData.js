import { SAVE_HOTEL_DATA } from '../Actions/index';

const initalState = {
  hotelData: null,
};

const saveHotelData = (state = initalState, action) => {
  switch (action.type) {
    case SAVE_HOTEL_DATA:
      return {
        ...state,
        hotelData: action.payload,
      };
    default:
      return state;
  }
};

export default saveHotelData;
