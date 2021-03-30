import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  LIST_ASSISTANCE,
} from "../ActionTypes";
import axios from '../../util/Api';
  
export const listDetail = (page = 1,params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('assistance/detail?page=' + page,
    params
    ).then(({ data }) => {  
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: LIST_ASSISTANCE, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};