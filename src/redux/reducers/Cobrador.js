import {
    FILTER_DEBCOLLECTOR,
  } from "../ActionTypes";
  
  const INIT_STATE = {
    debCollectorFilter:[],
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FILTER_DEBCOLLECTOR: {
        return {
          ...state,
          debCollectorFilter: action.payload,
        }
      }
      default:
        return state;
    }
  }
  