import {
  LIST_CLIENTS,
  FILTER_CLIENTE,
  SHOW_CLIENTE,
  SAVE_CLIENT,
  CLIENT_STATUS_ACTIONS,
} from "../ActionTypes";

const INIT_STATE = {
  clientList:[],
  clienteFilter:[],
  clienteObject: [],
  clientStatusActions:0,
};

const states = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIST_CLIENTS: {
      return {
        ...state,
        clientList: action.payload
      }
    }
    case FILTER_CLIENTE: {
      return {
        ...state,
        clienteFilter: action.payload,
      }
    }
    case SHOW_CLIENTE: {
        return {
            ...state,
            clienteObject : action.payload
        }
    }
    case SAVE_CLIENT:
      return {
        ...state,
      }
    case CLIENT_STATUS_ACTIONS: {
        return {
            ...state,
            clientStatusActions:action.payload
        }
    }
    default:
      return state;
  }
}
export default states;