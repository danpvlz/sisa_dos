import {
    LIST_CALLS,
  } from "../ActionTypes";
  
  const INIT_STATE = {
    phoneCallList: [],
    meta: {
      total: 0,
      last_page:1,
    },
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case LIST_CALLS: {
        return {
          ...state,
          phoneCallList: action.payload,
          meta:action.payload.meta
        }
      }
      default:
        return state;
    }
  }
  