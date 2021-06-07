import {
  INIT_URL, SIGNOUT_USER_SUCCESS, USER_DATA, USER_TOKEN_SET, USER_UPDATE_PASSWORD,
  AUTH_STATUS_ACTIONS,
  AUTH_MESSAGE, POWERBI_CHECK
} from "../ActionTypes";

const INIT_STATE = {
  token: JSON.parse(localStorage.getItem('token')),
  initURL: '',
  authUser: JSON.parse(localStorage.getItem('user')),
  authStatusActions: 0,
  auth_message: '',
  powerBiAuthorization: 0,
  forgotPassword: null
};

const states = (state = INIT_STATE, action) => {
  switch (action.type) {


    case INIT_URL: {
      return { ...state, initURL: action.payload };
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: ''
      }
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case POWERBI_CHECK: {
      return {
        ...state,
        powerBiAuthorization: action.payload,
      };
    }

    case AUTH_MESSAGE: {
      return {
        ...state,
        auth_message: action.payload,
      };
    }

    case AUTH_STATUS_ACTIONS: {
      return {
        ...state,
        authStatusActions: action.payload,
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case USER_UPDATE_PASSWORD: {
      return {
        ...state
      }
    }
    default:
      return state;
  }
}
export default states;