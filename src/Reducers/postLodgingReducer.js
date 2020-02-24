import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from '../Actions/getPostsLodging';

const initalState = {
  isFetching: false,
  items: null,
};

const postsLodging = (state = initalState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.postslodging,
      };
    default:
      return state;
  }
};

export default postsLodging;
