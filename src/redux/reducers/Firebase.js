import {
  NOTIFICATIONS_LIST,
  LOADED_OLD_NOTIFICATIONS,
} from "../ActionTypes";

const INIT_STATE = {
  notifications: [],
  loadedOldNotifications: false,
};

const states = (state = INIT_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_LIST: {
      return {
        ...state,
        notifications: action.payload,
        loadedOldNotifications: true,
      };
    }
    case LOADED_OLD_NOTIFICATIONS: {
      return {
        ...state,
        loadedOldNotifications: action.payload,
      };
    }
    default:
      return state;
  }
}
export default states;