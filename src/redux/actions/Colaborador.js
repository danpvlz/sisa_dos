import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    LIST_WORKER
  } from "../ActionTypes";
  import axios from '../../util/Api'
  
  export const listWorker = (page = 1) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.get('/worker?page=' + page,
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_WORKER, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        console.log(error)
  
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
    }
  };