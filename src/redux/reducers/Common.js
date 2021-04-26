import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, HIDE_MESSAGE, SHOW_MESSAGE,ROUTES_LIST} from '../ActionTypes'

const INIT_STATE = {
  error: false,
  success: false,
  loading: false,
  message: '',
  routesList:[]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ROUTES_LIST: {
      return {
        ...state,
        routesList: action.payload,
      }
    }
    case FETCH_START: {
      return {...state, success: false, error: false, message: '', loading: true};
    }
    case FETCH_SUCCESS: {
      return {...state, success: false, error: false, message: '', loading: false};
    }
    case SHOW_MESSAGE: {
      return {...state, success: true, error: false, message: action.payload, loading: false};
    }
    case FETCH_ERROR: {
      return {...state, success: false, error: true, message: action.payload, loading: false};
    }
    case HIDE_MESSAGE: {
      return {...state, success: false, error: false, message: '', loading: false };
    }
    default:
      return state;
  }
}
