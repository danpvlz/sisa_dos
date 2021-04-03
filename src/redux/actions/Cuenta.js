import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SHOW_MESSAGE,
    SHOW_COMPROBANTE,
    LIST_BILLS,
    INDICATORS_BILLS,
    LIST_PENDINGS,
    INDICATORS_PENDINGS,
    LIST_MEMBERSHIPS,
    BILL_STATUS_ACTIONS,
    SAVE_BILL,
    ANUL_BILL,
    PAY_BILL,
} from "../ActionTypes";
import axios from '../../util/Api';
  
export const listBills = (page = 1,params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('bill/list?page=' + page,
      params
      ).then(({ data }) => {  
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_BILLS, payload: data });
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
      axios.post('billsindicators' ,
      params
      ).then(({ data }) => {  
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: INDICATORS_BILLS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
};
  
export const listPendings = (page = 1,params={"fecha":new Date().toISOString().substring(0, 10)}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('listpendings?page=' + page,
      params
      ).then(({ data }) => {  
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_PENDINGS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
};
  
export const indicatorsPendings = (params={"fecha":new Date().toISOString().substring(0, 10)}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('pendingsindicators',
      params
      ).then(({ data }) => {  
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: INDICATORS_PENDINGS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
};
  
export const listMemberships = (page = 1,params={}) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('listmemberships?page=' + page,
      params
      ).then(({ data }) => {  
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: LIST_MEMBERSHIPS, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
      });
    }
};

export const getBillDetail = (params={}) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axios.post('detailbill',
        params
        ).then(({ data }) => {
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

export const showComprobante = (params={}) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axios.post('/showcomprobante',
        params
        ).then(({ data }) => {
            if (data) {
                dispatch({ type: FETCH_SUCCESS });
                window.open(data.enlace_del_pdf);
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

    axios.post('savecomprobante',
    comprobanteData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SAVE_BILL });
        dispatch({ type: BILL_STATUS_ACTIONS, payload: status });
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

export const pagarCuenta = (payData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: BILL_STATUS_ACTIONS, payload: 0 });

    axios.post('pay',
    payData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: PAY_BILL });
        dispatch({ type: BILL_STATUS_ACTIONS, payload: status });
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

export const anularCuenta = (anularData) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: BILL_STATUS_ACTIONS, payload: 0 });

    axios.post('annulment',
    anularData
    ).then(({ data, status }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: ANUL_BILL });
        dispatch({ type: BILL_STATUS_ACTIONS, payload: status });
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