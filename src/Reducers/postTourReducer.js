import { GET_POSTS_REQ, GET_POSTS_SUC, GET_POSTS_FAI } from '../Actions/getPostsTour';

const initalState = {
  isFetching: false,
  items: null,
};

const postsTour = (state = initalState, action) => {
  switch (action.type) {
    case GET_POSTS_REQ:
      return {
        ...state,
        isFetching: true,
      };
    case GET_POSTS_SUC:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
      };
    case GET_POSTS_FAI:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default postsTour;
