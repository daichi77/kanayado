export const SEND_FILTER_TEXT = 'SEND_FILTER_TEXT';
export const sendFilterText = (text) => {
  // console.log(filterText);
  return {
    type: SEND_FILTER_TEXT,
    payload: {
      text,
    },
  };
};

export const MODAL_IS_OPEN = 'MODAL_IS_OPEN';
export const modalIsOpen = () => {
  return {
    type: MODAL_IS_OPEN,
  };
};

export const TOGGLE_MODAL_IS_OPEN = 'TOGGLE_MODAL_IS_OPEN';
export const toggelModalIsOpen = () => {
  return {
    type: TOGGLE_MODAL_IS_OPEN,
  };
};
