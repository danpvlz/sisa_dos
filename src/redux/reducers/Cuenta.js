import {
    SHOW_COMPROBANTE,
    LIST_BILLS,
    INDICATORS_BILLS,
    LIST_PENDINGS,
    INDICATORS_PENDINGS,
    LIST_MEMBERSHIPS,
    BILL_STATUS_ACTIONS,
    SAVE_BILL,
  } from "../ActionTypes";
  
  const INIT_STATE = {
    comprobanteObject: [],
    billList:[],
    billIndicators:[],
    pendingsIndicators:[],
    pendingsList:[],
    membershipList:[],
    billsStatusActions:0
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case LIST_BILLS: {
          return {
              ...state,
              billList : action.payload
          }
      }
      case INDICATORS_BILLS: {
          return {
              ...state,
              billIndicators : action.payload
          }
      }
      case INDICATORS_PENDINGS: {
          return {
              ...state,
              pendingsIndicators : action.payload
          }
      }
      case LIST_PENDINGS: {
          return {
              ...state,
              pendingsList : action.payload
          }
      }
      case LIST_MEMBERSHIPS: {
          return {
              ...state,
              membershipList : action.payload
          }
      }
    case SHOW_COMPROBANTE: {
        return {
            ...state,
            comprobanteObject : action.payload
        }
    }
    case BILL_STATUS_ACTIONS: {
        return {
            ...state,
            billsStatusActions:action.payload
        }
    }
    case SAVE_BILL:
      return {
        ...state,
      }
      default:
        return state;
    }
  }
  