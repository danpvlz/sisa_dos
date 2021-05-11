import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  LIST_BILLS_CAJA,
  BILL_STATUS_ACTIONS,
  SAVE_BILL,
  SHOW_MESSAGE,
  ANUL_BILL,
  PAY_BILL,
  SHOW_COMPROBANTE,
  INDICATORS_BILLS_CAJA,
  DASHBOARD_DATA,
} from "../ActionTypes";
import axios from '../../util/Api';

export const listBills = (page = 1,params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('caja/list?page=' + page,
    params
    ).then(({ data }) => {  
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: LIST_BILLS_CAJA, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};

export const saveCuenta = (comprobanteData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: BILL_STATUS_ACTIONS, payload: 0 });

    axios.post('caja',
    comprobanteData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SAVE_BILL });
        dispatch({ type: BILL_STATUS_ACTIONS, payload: status });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const anularCuenta = (idCuenta) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: BILL_STATUS_ACTIONS, payload: 0 });

    axios.get('cajaAnul/'+idCuenta
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: ANUL_BILL });
        dispatch({ type: BILL_STATUS_ACTIONS, payload: status });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const payCaja = (payData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: BILL_STATUS_ACTIONS, payload: 0 });

    axios.post('cajaPay',
    payData
    ).then(({ data, status }) => {
      if(data.error){
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }else{
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: PAY_BILL });
        dispatch({ type: BILL_STATUS_ACTIONS, payload: status });
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const getDetail = (idCuenta) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axios.get('caja/'+idCuenta)
        .then(({ data }) => {
            if (data) {
              dispatch({ type: FETCH_SUCCESS });
              dispatch({ type: SHOW_COMPROBANTE, payload: data });
            } else {
                dispatch({ type: FETCH_ERROR, payload: data.error });
            }
        }).catch(function (error) {
            dispatch({ type: FETCH_ERROR, payload: error });
        });
    }
};
  
export const indicatorsBills = (params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('cajaIndicators' ,
      params
      ).then(({ data }) => {  
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: INDICATORS_BILLS_CAJA, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
};

export const loadDashboard = (params={}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('cajaDashboard',
    params
    ).then(({ data }) => {  
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: DASHBOARD_DATA, payload: data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    });
  }
};