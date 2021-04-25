import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
  LIST_WORKER,
  WORKER_STATUS_ACTIONS,
  ACTIVE_WORKER,
  UPDATE_WORKER,
  GET_WORKER,
  RESET_PASSWORD_WORKER,
  FILTER_WORKER
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
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const status = (id) => {

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: WORKER_STATUS_ACTIONS, payload: 0 });

    axios.get('/worker/status/' + id
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: ACTIVE_WORKER });
        dispatch({ type: WORKER_STATUS_ACTIONS, payload: status });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }

    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const vacations = (id) => {

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: WORKER_STATUS_ACTIONS, payload: 0 });

    axios.get('/worker/vacations/' + id
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: ACTIVE_WORKER });
        dispatch({ type: WORKER_STATUS_ACTIONS, payload: status });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }

    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const update = (id,workerData) => {
  var bodyFormData = new FormData();
  bodyFormData.append('nombres', workerData.fullName);
  bodyFormData.append('apellidoPaterno', workerData.firstName);
  bodyFormData.append('apellidoMaterno', workerData.secondName);
  bodyFormData.append('fechaNacimiento', workerData.birthday);
  bodyFormData.append('foto', workerData.photo);
    
  let config = {
      headers:  { "Content-Type": "multipart/form-data" }
  }


  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: WORKER_STATUS_ACTIONS, payload: 0 });

    axios.post('/worker/' + id,
    bodyFormData,
    config
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: UPDATE_WORKER });
        dispatch({ type: WORKER_STATUS_ACTIONS, payload: status });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }

    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const showWorker = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.get('worker/'+id,
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: GET_WORKER, payload: data });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const resetShowWorker = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_WORKER, payload: [] });
  }
};

export const resetPassword = (id) => {

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: WORKER_STATUS_ACTIONS, payload: 0 });

    axios.get('/worker/resetPassword/' + id
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: RESET_PASSWORD_WORKER });
        dispatch({ type: WORKER_STATUS_ACTIONS, payload: status });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }

    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};
  
export const filter = (search="") => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('/workerFilterData',
    {
        "search": search
    }
    ).then(({data}) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: FILTER_WORKER, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};