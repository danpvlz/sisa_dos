import {
    FILTER_PROMOTOR,
  } from "../ActionTypes";
  
  const INIT_STATE = {
    promotorFilter:[],
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FILTER_PROMOTOR: {
        return {
          ...state,
          promotorFilter: action.payload,
        }
      }
      default:
        return state;
    }
  }
  