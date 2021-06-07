import {
    FETCH_ERROR,
    FETCH_SUCCESS,
    FILTER_COMITE,
  } from "../ActionTypes";
  import axios from '../../util/Api'
  
  export const filter = (search="") => {
    return (dispatch) => {
      axios.post('auth/comiteFilterData',
      {
          "search": search
      }
      ).then(({data}) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: FILTER_COMITE, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };