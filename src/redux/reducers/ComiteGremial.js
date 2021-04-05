import {
    FILTER_COMITE,
  } from "../ActionTypes";
  
  const INIT_STATE = {
    comiteGremialFilter:[],
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FILTER_COMITE: {
        return {
          ...state,
          comiteGremialFilter: action.payload,
        }
      }
      default:
        return state;
    }
  }
  