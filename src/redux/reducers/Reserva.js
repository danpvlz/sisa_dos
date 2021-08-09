import {
    LIST_RESERVATION,
    LIST_RESERVATION_WEEK,
    LIST_RESERVATION_MONTH,
    SAVE_RESERVATION,
    RESERVATION_STATUS_ACTIONS,
  } from "../ActionTypes";
  
  const INIT_STATE = {
    reservationList: [],
    reservationWeek: [],
    reservationMonth: [],
    reservationStatusAction: 0,
  };
  
  const states = (state = INIT_STATE, action) => {
    switch (action.type) {
      case LIST_RESERVATION: {
        return {
          ...state,
          reservationList: action.payload,
          meta: action.payload.meta
        }
      }
      case LIST_RESERVATION_WEEK: {
        return {
          ...state,
          reservationWeek: action.payload,
          meta: action.payload.meta
        }
      }
      case LIST_RESERVATION_MONTH: {
        return {
          ...state,
          reservationMonth: action.payload,
          meta: action.payload.meta
        }
      }
      case SAVE_RESERVATION:
        return {
          ...state,
        }
      case RESERVATION_STATUS_ACTIONS: {
        return {
          ...state,
          reservationStatusAction: action.payload
        }
      }
      default:
        return state;
    }
  }
  export default states;