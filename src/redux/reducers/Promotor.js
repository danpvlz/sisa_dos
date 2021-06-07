import {
    FILTER_PROMOTOR,
  } from "../ActionTypes";
  
  const INIT_STATE = {
    promotorFilter:[],
  };
  
  const states = (state = INIT_STATE, action) => {
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
  
  export default states;