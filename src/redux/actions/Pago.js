import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    LIST_PAGOS,
  } from "../ActionTypes";
  import axios from '../../util/Api';
  
  export const list = (page = 1,params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/pagoList?page=' + page,
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_PAGOS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };

  export const exportPagos = (params = {}) => {
    let config = {
      responseType: 'blob', // important
    }
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/pagosExport',
        params,
        config
      ).then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Pagos.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
        dispatch({ type: FETCH_SUCCESS });
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };