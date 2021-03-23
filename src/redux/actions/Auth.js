import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
  USER_UPDATE_PASSWORD,
  SHOW_MESSAGE,
  AUTH_STATUS_ACTIONS,
  AUTH_MESSAGE,
  PASSWORD_REQUIREMENTS
} from "../ActionTypes";
import axios from '../../util/Api'

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignUp = ({ email, password }) => {

};

export const userSignIn = ({ userName, password, remember }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.post('auth/login', {
      userName: userName,
      password: password,
      remember: remember,
    }
    ).then(({ data }) => {
      if (data) {
        localStorage.setItem("token", JSON.stringify(data.access_token));
        axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      console.log((error.response));
      if (error.response) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });

      } else {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      }
    });
  }
};

export const getUser = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.get('auth/user',
    ).then(({ data }) => {
      console.log("getUser: ", data);
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: USER_DATA, payload: data });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
  }
};

export const updatePassword = (values) => {
  console.log(values)
  let config = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
  return (dispatch) => {

    dispatch({ type: FETCH_START });
    axios.post('/auth/updatePassword',
      values,
      config
    ).then(({ data, status }) => {
      console.log(data)
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: USER_UPDATE_PASSWORD });
        dispatch({ type: SHOW_MESSAGE, payload: data.message });
        dispatch({ type: AUTH_STATUS_ACTIONS, payload: status });
        dispatch({ type: AUTH_MESSAGE, payload: data.message });



      } else {
        dispatch({ type: FETCH_ERROR, payload: data.message });
      }
    })
      .catch(function (error) {
        //dispatch({type:AUTH_STATUS_ACTIONS, payload: status});
        //dispatch({type: AUTH_MESSAGE,payload: data.message});
        dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
      });
  }
};

export const userSignOut = () => {

  return (dispatch) => {
    dispatch({ type: FETCH_START });

    axios.get('auth/logout').then(({ data }) => {
      if (data) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SIGNOUT_USER_SUCCESS });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: SIGNOUT_USER_SUCCESS });
    });
  }
};

export const getPasswordInfo = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios.get('auth/getPasswordInfo'
    ).then(({ data }) => {
      if (data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: PASSWORD_REQUIREMENTS, payload: data });

      } else {
        dispatch({ type: FETCH_ERROR, payload: data.error });
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
  }
};
