import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    LIST_CALLS,
  } from "../ActionTypes";
  import axios from '../../util/Api'
  
  export const listCalls = (page = 1,params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/phonecalls/list?page=' + page,
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_CALLS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };

  export const exportPhoneCalls  = (params={}) => {
    let config = {
        responseType: 'blob',
    }
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/phonecalls/export',
      params  ,
      config
      ).then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'llamadas.xls'); //or any other extension
        document.body.appendChild(link);
        link.click();
        dispatch({ type: FETCH_SUCCESS });
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };