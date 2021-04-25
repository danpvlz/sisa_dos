import {
    LIST_BILLS_CAJA,
    INDICATORS_BILLS_CAJA
  } from "../ActionTypes";
  
  const INIT_STATE = {
    billListCaja:[],
    billIndicatorsCaja:[],
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
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
  