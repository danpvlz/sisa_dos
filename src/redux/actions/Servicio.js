import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SHOW_MESSAGE,
    LIST_SERVICES,
    SAVE_SERVICE,
    SERVICES_STATUS_ACTIONS,
  } from "../ActionTypes";
  import axios from '../../util/Api'
  
  export const listServices = (page = 1,params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/service/list?page=' + page,
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_SERVICES, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };

  export const saveService = (serviceData) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: SERVICES_STATUS_ACTIONS, payload: 0 });
  
      axios.post('service',
      serviceData
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: SAVE_SERVICE });
          dispatch({ type: SERVICES_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };