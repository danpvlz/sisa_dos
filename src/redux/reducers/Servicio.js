import {
    LIST_SERVICES,
    SAVE_SERVICE,
    SERVICES_STATUS_ACTIONS,
  } from "../ActionTypes";
  
  const INIT_STATE = {
    servicesList: [],
    meta: {
      total: 0,
      last_page:1,
    },
    servicesStatusActions:0,
  };
  
  const states = (state = INIT_STATE, action) => {
    switch (action.type) {
      case LIST_SERVICES: {
        return {
          ...state,
          servicesList: action.payload,
          meta:action.payload.meta
        }
      }
      case SAVE_SERVICE:
        return {
          ...state,
        }
      case SERVICES_STATUS_ACTIONS: {
          return {
              ...state,
              servicesStatusActions:action.payload
          }
      }
      default:
        return state;
    }
  }
  
  export default states;