export const SEND_FILTER_TEXT = 'SEND_FILTER_TEXT';
// eslint-disable-next-line import/prefer-default-export
export const sendFilterText = (text) => {
  // console.log(filterText);
  return {
    type: SEND_FILTER_TEXT,
    payload: {
      text,
    },
  };
};
