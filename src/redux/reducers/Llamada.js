import {
  LIST_CALLS,
  SAVE_CALL,
  CALLS_STATUS_ACTIONS,
} from "../ActionTypes";

const INIT_STATE = {
  phoneCallList: [],
  meta: {
    total: 0,
    last_page: 1,
  },
  callsStatusActions: 0,
};

const states = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIST_CALLS: {
      return {
        ...state,
        phoneCallList: action.payload,
        meta: action.payload.meta
      }
    }
    case SAVE_CALL:
      return {
        ...state,
      }
    case CALLS_STATUS_ACTIONS: {
      return {
        ...state,
        callsStatusActions: action.payload
      }
    }
    default:
      return state;
  }
}
export default states;