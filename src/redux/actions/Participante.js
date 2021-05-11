import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SHOW_MESSAGE,
    LIST_PARTICIPANTES,
    GET_PARTICIPANTE,
    SAVE_PARTICIPANTE,
    UPDATE_PARTICIPANTE,
    PARTICIPANTES_STATUS_ACTIONS,
    FILTER_PARTICIPANTS,
  } from "../ActionTypes";
  import axios from '../../util/Api';
  
  export const list = (page = 1,params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/participantList?page=' + page,
      params
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_PARTICIPANTES, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };
  
  export const store = (participantData) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: PARTICIPANTES_STATUS_ACTIONS, payload: 0 });
  
      axios.post('participant',
      participantData
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SAVE_PARTICIPANTE });
          dispatch({ type: PARTICIPANTES_STATUS_ACTIONS, payload: status });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.message });
        }
      })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        });
    }
  };
  
  export const update = (participantData,idParticipant) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: PARTICIPANTES_STATUS_ACTIONS, payload: 0 });
  
      axios.put('participant/'+idParticipant,
      participantData
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_PARTICIPANTE });
          dispatch({ type: PARTICIPANTES_STATUS_ACTIONS, payload: status });
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
      dispatch({ type: FETCH_START });
      axios.get('participant/'+id,
      ).then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_PARTICIPANTE, payload: data });
  
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };
  
  export const resetObject = () => {
    return (dispatch) => {
      dispatch({ type: GET_PARTICIPANTE, payload: [] });
    }
  }
  
  export const destroy = (idParticipant) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      dispatch({ type: PARTICIPANTES_STATUS_ACTIONS, payload: 0 });
  
      axios.delete('participant/'+idParticipant
      ).then(({ data, status }) => {
        if (data) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_PARTICIPANTE });
          dispatch({ type: PARTICIPANTES_STATUS_ACTIONS, payload: status });
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
      axios.post('/filterParticipants',
      {
          "search": search
      }
      ).then(({data}) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: FILTER_PARTICIPANTS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
  };