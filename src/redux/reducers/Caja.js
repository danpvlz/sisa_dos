import {
    LIST_BILLS_CAJA,
    INDICATORS_BILLS_CAJA,
    DASHBOARD_DATA
  } from "../ActionTypes";
  
  const INIT_STATE = {
    cajaDashboard:[],
    billListCaja:[],
    billIndicatorsCaja:[],
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case DASHBOARD_DATA: {
          return {
              ...state,
              cajaDashboard : action.payload
          }
      }
        case LIST_BILLS_CAJA: {
            return {
                ...state,
                billListCaja : action.payload
            }
        }
        case INDICATORS_BILLS_CAJA: {
            return {
                ...state,
                billIndicatorsCaja : action.payload
            }
        }
      default:
        return state;
    }
  }
  