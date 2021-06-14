import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SHOW_MESSAGE,
    LIST_INSCRIPTIONS,
    GET_INSCRIPTION,
    SAVE_INSCRIPTION,
    UPDATE_INSCRIPTION,
    INSCRIPTION_STATUS_ACTIONS,
  } from "../ActionTypes";
  import axios from '../../util/Api';
  
  export const list = (page = 1,params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/inscriptionList?page=' + page,
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_INSCRIPTIONS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };
  
  export const store = (data) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: 0 });
  
      axios.post('inscription',
      data
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SAVE_INSCRIPTION });
          dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };
  
  export const externalInscription = (data) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: 0 });
  
      axios.post('externalInscription',
      data
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SAVE_INSCRIPTION });
          dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };
  
  export const update = (data,id) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: 0 });
  
      axios.post('inscriptionUpdate/'+id,
      data
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_INSCRIPTION });
          dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };
  
  export const changeStatus = (idCurso) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: 0 });
  
      axios.get('courseStatus/'+idCurso
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_INSCRIPTION });
          dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };
  
  export const show = (id) => {
    return (dispatch) => {
      axios.get('inscription/'+id,
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_INSCRIPTION, payload: data[0] });
  
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };
  
  export const reset = () => {
    return (dispatch) => {
      dispatch({ type: GET_INSCRIPTION, payload: [] });
    }
  }
  
  export const destroy = (id) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: 0 });
  
      axios.post('inscriptionDelete/'+id
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_INSCRIPTION });
          dispatch({ type: INSCRIPTION_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };

  export const exportInscripciones = (params = {}) => {
    let config = {
      responseType: 'blob', // important
    }
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/inscriptionsExport',
        params,
        config
      ).then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Estructura_Certificados.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
        dispatch({ type: FETCH_SUCCESS });
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };