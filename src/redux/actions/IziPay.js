import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    LIST_INSCRIPTIONS,
  } from "../ActionTypes";
  import axios from '../../util/Api';
  
  export const list = (params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/iziini',
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_INSCRIPTIONS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };