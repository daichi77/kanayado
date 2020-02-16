import { MODAL_IS_OPEN, TOGGLE_MODAL_IS_OPEN } from '../Actions/index';

const initalState = {
  isOpen: false,
};

const modalIsOpen = (state = initalState, action) => {
  switch (action.type) {
    case MODAL_IS_OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case TOGGLE_MODAL_IS_OPEN:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default modalIsOpen;
