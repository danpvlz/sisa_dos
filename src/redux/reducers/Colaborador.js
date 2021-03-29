import {
  LIST_WORKER,
  WORKER_STATUS_ACTIONS,
  ACTIVE_WORKER,
  UPDATE_WORKER,
  GET_WORKER,
  RESET_PASSWORD_WORKER
} from "../ActionTypes";

const INIT_STATE = {
  workerList: [],
  meta: {
    total: 0,
    last_page:1,
  },
  workerStatusActions: 0,
  workerObject: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIST_WORKER: {
      return {
        ...state,
        workerList: action.payload,
        meta:action.payload.meta
      }
    }
    case WORKER_STATUS_ACTIONS: {
        return {
            ...state,
            workerStatusActions:action.payload
        }
    }
    case ACTIVE_WORKER: {
      return {
          ...state
      }
  }
  case RESET_PASSWORD_WORKER: {
    return {
        ...state
    }
}
  case UPDATE_WORKER: {
      return {
          ...state
      }
  }
      
  case GET_WORKER: {
      return {
          ...state,
          workerObject : action.payload
      }
  }
    default:
      return state;
  }
}
