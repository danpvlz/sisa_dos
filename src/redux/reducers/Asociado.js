import {
  LIST_ASSOCIATED,
  FILTER_ASSOCIATED,
  ASSOCIATED_STATUS_ACTIONS,
  INDICATORS_ASSOCIATED,
  SHOW_ASSOCIATED,
  SHOW_EDIT_ASSOCIATED,
  SAVE_ASSOCIATED,
  UPDATE_ASSOCIATED,
  SHOW_RUC_SEARCHED,
  SHOW_DNI_SEARCHED,
  LIST_MONTH_CALENDAR_ASSOCIATED,
  LIST_WEEK_CALENDAR_ASSOCIATED,
} from "../ActionTypes";

const INIT_STATE = {
  associatedList: [],
  meta: {
    total: 0,
    last_page: 1,
  },
  associatedStatusActions: 0,
  associatedObject: [],
  associatedEditObject: [],
  associatedFilter: [],
  associatedIndicators: {
    associateds: 0,
    afiliations: 0,
    retreats: 0,
    retreatsActualMonth: 0,
    inProcess: 0,
  },
  dniSearched: null,
  rucSearched: null,
  associatedMonthCalendar: [],
  associatedWeekCalendar: [],
};

const states = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIST_MONTH_CALENDAR_ASSOCIATED: {
      return {
        ...state,
        associatedMonthCalendar: action.payload
      }
    }
    case LIST_WEEK_CALENDAR_ASSOCIATED: {
      return {
        ...state,
        associatedWeekCalendar: action.payload
      }
    }
    case LIST_ASSOCIATED: {
      return {
        ...state,
        associatedList: action.payload,
        meta: action.payload.meta
      }
    }
    case FILTER_ASSOCIATED: {
      return {
        ...state,
        associatedFilter: action.payload,
      }
    }
    case INDICATORS_ASSOCIATED: {
      return {
        ...state,
        associatedIndicators: action.payload,
      }
    }
    case ASSOCIATED_STATUS_ACTIONS: {
      return {
        ...state,
        associatedStatusActions: action.payload
      }
    }
    case SAVE_ASSOCIATED: {
      return {
        ...state,
      }
    }
    case UPDATE_ASSOCIATED: {
      return {
        ...state,
      }
    }
    case SHOW_ASSOCIATED: {
      return {
        ...state,
        associatedObject: action.payload
      }
    }
    case SHOW_EDIT_ASSOCIATED: {
      return {
        ...state,
        associatedEditObject: action.payload
      }
    }
    case SHOW_RUC_SEARCHED: {
      return {
        ...state,
        rucSearched: action.payload
      }
    }
    case SHOW_DNI_SEARCHED: {
      return {
        ...state,
        dniSearched: action.payload
      }
    }
    default:
      return state;
  }
}
export default states;