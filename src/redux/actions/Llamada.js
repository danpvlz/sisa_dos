import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SHOW_MESSAGE,
    LIST_CALLS,
    SAVE_CALL,
    CALLS_STATUS_ACTIONS,
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
        link.setAttribute('download', 'llamadas.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
        dispatch({ type: FETCH_SUCCESS });
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };

  export const savePhoneCall = (phoeCallData) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: CALLS_STATUS_ACTIONS, payload: 0 });
  
      axios.post('phonecalls',
      phoeCallData
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SAVE_CALL });
          dispatch({ type: CALLS_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };