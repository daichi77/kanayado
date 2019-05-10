import fetch from 'cross-fetch';

export const GET_POSTS_REQ = 'GET_POSTS_REQ';
const getPostsRequest = () => {
  return {
    type: GET_POSTS_REQ,
  };
};

export const GET_POSTS_SUC = 'GET_POSTS_SUC';
const getPostsSuccess = (data) => {
  return {
    type: GET_POSTS_SUC,
    posts: data,
    receivedAt: Date.now(),
  };
};

export const GET_POSTS_FAI = 'GET_POSTS_FAI';
const getPostsFailure = (error) => {
  return {
    type: GET_POSTS_FAI,
    error,
  };
};

let tour = [];

const touristSpot = (url, dispatch) => {
  fetch(url)
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      return res.json();
    })
    .then((json) => {
      tour = tour.concat(json.facilities);
      if (json.next_page !== undefined) {
        touristSpot(json.next_page, dispatch);
      } else {
        dispatch(getPostsSuccess(tour));
      }
    })
    .catch((error) => {
      dispatch(getPostsFailure(error));
    });
};

export const getPostsTour = () => (dispatch) => {
  dispatch(getPostsRequest);

  return fetch('https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1')
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      return res.json();
    })
    .then((json) => {
      tour = tour.concat(json.facilities);
      if (json.next_page !== undefined) {
        touristSpot(json.next_page, dispatch);
      }
    });
};
