// actions.js

import axios from 'axios';

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

const fetchSuccess = (data) => {
  // Add imgSrc property to each post object
  const updatedData = data.map((post) => ({
    ...post,
    imgSrc: `https://picsum.photos/200?random=${post.id}`,
  }));

  return {
    type: FETCH_DATA_SUCCESS,
    payload: updatedData,
  };
};

const fetchFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const fetchData = () => {
  return (dispatch) => {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        dispatch(fetchSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchFailure(error));
      });
  };
};
