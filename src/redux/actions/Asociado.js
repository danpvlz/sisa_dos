import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SHOW_MESSAGE,
    LIST_ASSOCIATED,
    FILTER_ASSOCIATED,
    INDICATORS_ASSOCIATED,
    ASSOCIATED_STATUS_ACTIONS
  } from "../ActionTypes";
  import axios from '../../util/Api'
  
  export const listAssociated = (page = 1,params={}) => {
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
  
  export const filter = (search="") => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/associatedFilterData',
      {
          "search": search
      }
      ).then(({data}) => {
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
      ).then(({data}) => {
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
  
  export const exportAssociateds  = (params={}) => {
    let config = {
      
  responseType: 'blob', // important
    }
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/associated/export',
      params  ,
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