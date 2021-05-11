import {
    NOTIFICATIONS_LIST,
    LOADED_OLD_NOTIFICATIONS,
  } from "../ActionTypes";

  export const setNotifications = (notifications) => {
      return (dispatch) => {
          dispatch({ type: NOTIFICATIONS_LIST, payload: notifications });
      }
  }
  

export const setLoadedOldNotifications = (state) => {
    return (dispatch) => {
        dispatch({ type: LOADED_OLD_NOTIFICATIONS, payload: state });
    }
}

export const resetLoadedOldNotifications = () => {
    return (dispatch) => {
        dispatch({ type: LOADED_OLD_NOTIFICATIONS, payload: false });
    }
}