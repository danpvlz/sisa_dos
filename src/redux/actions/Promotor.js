import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    FILTER_PROMOTOR,
  } from "../ActionTypes";
  import axios from '../../util/Api'
  
  export const filter = (search="") => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('auth/promotorFilterData',
      {
          "search": search
      }
      ).then(({data}) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: FILTER_PROMOTOR, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };