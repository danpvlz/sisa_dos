import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
  FILTER_CONCEPT,
  LIST_CONCEPTO,
  GET_CONCEPT,
  SAVE_CONCEPT,
  UPDATE_CONCEPT,
  CONCEPT_STATUS_ACTIONS,
  FILTER_AREAS,
  FILTER_CATEGORIES,
} from "../ActionTypes";
import axios from '../../util/Api';
  
export const filter = (search="") => {
  return (dispatch) => {
    axios.post('/conceptoFilterData',
    {
        "search": search
    }
    ).then(({data}) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: FILTER_CONCEPT, payload: data });
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
    axios.post('/listconcepto?page=' + page,
    params
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: LIST_CONCEPTO, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const store = (conceptData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: CONCEPT_STATUS_ACTIONS, payload: 0 });

    axios.post('concepto',
    conceptData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SAVE_CONCEPT });
        dispatch({ type: CONCEPT_STATUS_ACTIONS, payload: status });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const update = (conceptData,idConcepto) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: CONCEPT_STATUS_ACTIONS, payload: 0 });

    axios.post('conceptoUpdate/'+idConcepto,
    conceptData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: UPDATE_CONCEPT });
        dispatch({ type: CONCEPT_STATUS_ACTIONS, payload: status });
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
    axios.get('concepto/'+id,
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: GET_CONCEPT, payload: data });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const resetConceptObject = () => {
  return (dispatch) => {
    dispatch({ type: GET_CONCEPT, payload: [] });
  }
}
  
export const filterAreas = (search="") => {
  return (dispatch) => {
    axios.post('/filterAreas',
    {
        "search": search
    }
    ).then(({data}) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: FILTER_AREAS, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};
  
export const filterCategories = (idArea) => {
  return (dispatch) => {
    axios.get('filterCategoriaCuenta/'+idArea).then(({data}) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: FILTER_CATEGORIES, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};