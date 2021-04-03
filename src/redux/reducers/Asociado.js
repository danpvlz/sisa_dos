import {
    LIST_ASSOCIATED,
    FILTER_ASSOCIATED,
    ASSOCIATED_STATUS_ACTIONS,
    INDICATORS_ASSOCIATED,
    SHOW_ASSOCIATED
  } from "../ActionTypes";
  
  const INIT_STATE = {
    associatedList: [],
    meta: {
      total: 0,
      last_page:1,
    },
    associatedStatusActions: 0,
    associatedObject: [],
    associatedFilter:[],
    associatedIndicators:{
      associateds:0,
      afiliations:0,
      retreats:0,
      retreatsActualMonth:0,
      inProcess:0,
    }
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case LIST_ASSOCIATED: {
        return {
          ...state,
          associatedList: action.payload,
          meta:action.payload.meta
        }
      }
      case FILTER_ASSOCIATED: {
        return {
          ...state,
          associatedFilter: action.payload,
        }
      }
      case INDICATORS_ASSOCIATED: {
        return {
          ...state,
          associatedIndicators: action.payload,
        }
      }
      case ASSOCIATED_STATUS_ACTIONS: {
          return {
              ...state,
              associatedStatusActions:action.payload
          }
      }
      
      case SHOW_ASSOCIATED: {
          return {
              ...state,
              associatedObject : action.payload
          }
      }
      default:
        return state;
    }
  }
  