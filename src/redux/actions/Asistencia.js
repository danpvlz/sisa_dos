import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  LIST_ASSISTANCE_BY_WORKER,
  LIST_ASSISTANCE_ALL,
  LIST_ASSISTANCE,
  MY_ASSISTANCE,
  MY_ASSISTANCE_DETAIL,
  INDICATORS_ASSISTANCE,
  INDICATORS_ASSISTANCE_ALL,
  MY_TODAY_ASSISTANCE,
  ASSISTANCE_STATUS_ACTIONS,
  SAVE_ASSISTANCE,
  SAVE_ASSISTANCE_JUSTIFICATION,
  SHOW_MESSAGE,
} from "../ActionTypes";
import axios from '../../util/Api';
  
export const listAssistanceByWorker = (page = 1,params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('assistance/assistancebyworker?page=' + page,
    params
    ).then(({ data }) => {  
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: LIST_ASSISTANCE_BY_WORKER, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};
  
export const listAssistance = (page = 1,params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('assistance/assistance?page=' + page,
    params
    ).then(({ data }) => {  
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: LIST_ASSISTANCE_ALL, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};
  
export const listDetail = (page = 1,params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('assistance/detail?page=' + page,
    params
    ).then(({ data }) => {  
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: LIST_ASSISTANCE, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};
  
export const myTodayAssistanceList = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('assistance/mytodayassistance'
    ).then(({ data }) => {  
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: MY_TODAY_ASSISTANCE, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};
  
export const myAssistance = (page = 1,params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('assistance/myassistance?page=' + page,
    params
    ).then(({ data }) => {  
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: MY_ASSISTANCE, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const myAssistanceDetail = (page = 1,params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('assistance/myassistanceDetail?page=' + page,
    params
    ).then(({ data }) => {  
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: MY_ASSISTANCE_DETAIL, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};
  
export const indicatorsAll = (params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('/assistance/indicatorsall',
    params
    ).then(({data}) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: INDICATORS_ASSISTANCE_ALL, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};
  
export const indicators = (params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('/assistance/indicators',
    params
    ).then(({data}) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: INDICATORS_ASSISTANCE, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const saveAssistance = (assistanceData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: ASSISTANCE_STATUS_ACTIONS, payload: 0 });

    axios.post('assistance/store',
    assistanceData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SAVE_ASSISTANCE });
        dispatch({ type: ASSISTANCE_STATUS_ACTIONS, payload: status });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const saveJustification = (justificationData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: ASSISTANCE_STATUS_ACTIONS, payload: 0 });
    axios.post('assistance/justify',
    justificationData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SAVE_ASSISTANCE_JUSTIFICATION });
        dispatch({ type: ASSISTANCE_STATUS_ACTIONS, payload: status });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const calcTime = (time)=>{
  let TimeFinal=Math.abs(time);
  let timeString="";
  if(TimeFinal > 43200){
    timeString +=  Math.trunc(TimeFinal / 43200) + "M ";
    TimeFinal-=(43200* Math.trunc(TimeFinal / 43200) );
  }
  if(TimeFinal > 1440){
    timeString +=  Math.trunc(TimeFinal / 1440) + "d ";
    TimeFinal-=(1440* Math.trunc(TimeFinal / 1440) );
  }
  if(TimeFinal > 1440){
    timeString +=  Math.trunc(TimeFinal / 1440) + "d ";
    TimeFinal-=(1440* Math.trunc(TimeFinal / 1440) );
  }
  if(TimeFinal > 60){
    timeString +=  Math.trunc(TimeFinal / 60) + "h ";
    TimeFinal-=(60* Math.trunc(TimeFinal / 60) );
  }
  if(TimeFinal > 0){
    timeString +=  Math.round(TimeFinal) + "min ";
  }
  timeString=timeString==="" ? "-" : timeString;
  return timeString;
}