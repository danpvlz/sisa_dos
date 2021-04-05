import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
  LIST_ASSOCIATED,
  FILTER_ASSOCIATED,
  INDICATORS_ASSOCIATED,
  ASSOCIATED_STATUS_ACTIONS,
  SHOW_ASSOCIATED,
  SAVE_ASSOCIATED,
  SHOW_EDIT_ASSOCIATED,
  UPDATE_ASSOCIATED,
} from "../ActionTypes";
import axios from '../../util/Api'

export const listAssociated = (page = 1, params = {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('/associated/list?page=' + page,
      params
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: LIST_ASSOCIATED, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const filter = (search = "") => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('/associatedFilterData',
      {
        "search": search
      }
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: FILTER_ASSOCIATED, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const indicators = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('/associated/indicators'
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: INDICATORS_ASSOCIATED, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const exportAssociateds = (params = {}) => {
  let config = {

    responseType: 'blob', // important
  }
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('/associated/export',
      params,
      config
    ).then(({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'asociados.xls'); //or any other extension
      document.body.appendChild(link);
      link.click();
      dispatch({ type: FETCH_SUCCESS });
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const showAssociated = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.get('associated/' + id,
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SHOW_ASSOCIATED, payload: data });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const clearShowAssociated = (id) => {
  return (dispatch) => {

    dispatch({ type: SHOW_ASSOCIATED, payload: [] });
  }
};

export const saveAssociated = (associatedData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: ASSOCIATED_STATUS_ACTIONS, payload: 0 });

    axios.post('associated',
      associatedData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SAVE_ASSOCIATED });
        dispatch({ type: ASSOCIATED_STATUS_ACTIONS, payload: status });
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const showEditAssociated = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.get('associatededit/' + id,
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SHOW_EDIT_ASSOCIATED, payload: data });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const resetEditAssociated = () => {
  return (dispatch) => {
    dispatch({ type: SHOW_EDIT_ASSOCIATED, payload: [] });
  }
};

export const update = (id,associatedData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: ASSOCIATED_STATUS_ACTIONS, payload: 0 });

    axios.post('associatedupdate/' + id,
    associatedData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: UPDATE_ASSOCIATED });
        dispatch({ type: ASSOCIATED_STATUS_ACTIONS, payload: status });
        dispatch({ type: SHOW_MESSAGE, payload: data.message });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }

    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const status = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: ASSOCIATED_STATUS_ACTIONS, payload: 0 });

    axios.get('associatedstatus/' + id,
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: UPDATE_ASSOCIATED });
        dispatch({ type: ASSOCIATED_STATUS_ACTIONS, payload: status });
        dispatch({ type: SHOW_MESSAGE, payload: data.message });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }

    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};