import { SEND_FILTER_TEXT } from '../Actions/index';

const initalState = {
  text: '',
};

const postsTour = (state = initalState, action) => {
  switch (action.type) {
    case SEND_FILTER_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
};

export default postsTour;
