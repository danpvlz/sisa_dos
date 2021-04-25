import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  FILTER_CLIENTE,
  SHOW_CLIENTE,
  SHOW_MESSAGE,
  SAVE_CLIENT,
  CLIENT_STATUS_ACTIONS,
  LIST_CLIENTS,
} from "../ActionTypes";
import axios from '../../util/Api';
  
export const filter = (search="") => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('/clienteFilterData',
    {
        "search": search
    }
    ).then(({data}) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: FILTER_CLIENTE, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const list = (page = 1,params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: CLIENT_STATUS_ACTIONS, payload: 0 });

    axios.post('clienteList/',params).then(({ data, status }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: LIST_CLIENTS, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const showCliente = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.get('cliente/' + id,
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SHOW_CLIENTE, payload: data });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const resetClienteObject = () => {
  return (dispatch) => {
    dispatch({ type: SHOW_CLIENTE, payload: [] });
  }
}

export const store = (clientData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: CLIENT_STATUS_ACTIONS, payload: 0 });

    axios.post('cliente',
    clientData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SAVE_CLIENT });
        dispatch({ type: CLIENT_STATUS_ACTIONS, payload: status });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const update = (clientData,id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: CLIENT_STATUS_ACTIONS, payload: 0 });

    axios.put('cliente/'+id,
    clientData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SAVE_CLIENT });
        dispatch({ type: CLIENT_STATUS_ACTIONS, payload: status });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};