import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SHOW_MESSAGE,
    LIST_CURSOS,
    GET_CURSO,
    SAVE_CURSO,
    UPDATE_CURSO,
    CURSOS_STATUS_ACTIONS,
    FILTER_CURSOS,
  } from "../ActionTypes";
  import axios from '../../util/Api';
  
  export const list = (page = 1,params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/courseList?page=' + page,
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_CURSOS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };
  
  export const store = (courseData) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: CURSOS_STATUS_ACTIONS, payload: 0 });
  
      axios.post('course',
      courseData
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SAVE_CURSO });
          dispatch({ type: CURSOS_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };
  
  export const update = (courseData,idCurso) => {
    var bodyFormData = new FormData();
    bodyFormData.append('descripcion', courseData.descripcion);
    bodyFormData.append('foto', courseData.foto);
    
    let config = {
        headers:  { "Content-Type": "multipart/form-data" }
    }

    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: CURSOS_STATUS_ACTIONS, payload: 0 });
  
      axios.post('courseUpdate/'+idCurso,
      bodyFormData,
      config
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_CURSO });
          dispatch({ type: CURSOS_STATUS_ACTIONS, payload: status });
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
      dispatch({ type: CURSOS_STATUS_ACTIONS, payload: 0 });
  
      axios.get('courseStatus/'+idCurso
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_CURSO });
          dispatch({ type: CURSOS_STATUS_ACTIONS, payload: status });
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
      axios.get('course/'+id,
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_CURSO, payload: data });
  
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };
  
  export const resetCursoObject = () => {
    return (dispatch) => {
      dispatch({ type: GET_CURSO, payload: [] });
    }
  }
  
  export const destroy = (idCurso) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: CURSOS_STATUS_ACTIONS, payload: 0 });
  
      axios.post('courseDelete/'+idCurso
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_CURSO });
          dispatch({ type: CURSOS_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };
  
  export const filter = (search="",isId=false) => {
    return (dispatch) => {
      axios.post('/filterCursos',
      {
          "search": search,
          "isId": isId
      }
      ).then(({data}) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: FILTER_CURSOS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };