import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SHOW_MESSAGE,
    LIST_RESERVATION,
    LIST_RESERVATION_WEEK,
    LIST_RESERVATION_MONTH,
    SAVE_RESERVATION,
    RESERVATION_STATUS_ACTIONS,
  } from "../ActionTypes";
  import axios from '../../util/Api'
  
  export const listReservation = (page = 1,params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/rcList?page=' + page,
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_RESERVATION, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };
  
  export const listWeek = (params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/rcListWeek',
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_RESERVATION_WEEK, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };
  
  export const listMonth = (params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/rcListMonth',
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_RESERVATION_MONTH, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };

  export const save = (reservationData) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: RESERVATION_STATUS_ACTIONS, payload: 0 });
  
      axios.post('rcStore',
      reservationData
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SAVE_RESERVATION });
          dispatch({ type: RESERVATION_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };

  export const checkIn = (dataCheckIn) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: RESERVATION_STATUS_ACTIONS, payload: 0 });
  
      axios.post('rcCheckIn',
      dataCheckIn
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SAVE_RESERVATION });
          dispatch({ type: RESERVATION_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };

  export const confirmarCheckIn = (dataCheckIn) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: RESERVATION_STATUS_ACTIONS, payload: 0 });
  
      axios.post('confirmCheckIn',
      dataCheckIn
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SAVE_RESERVATION });
          dispatch({ type: RESERVATION_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };