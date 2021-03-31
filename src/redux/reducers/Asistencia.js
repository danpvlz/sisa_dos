import { 
  LIST_ASSISTANCE_BY_WORKER,
  LIST_ASSISTANCE_ALL, 
  LIST_ASSISTANCE, 
  MY_TODAY_ASSISTANCE,
  MY_ASSISTANCE, 
  MY_ASSISTANCE_DETAIL, 
  SAVE_ASSISTANCE, 
  INDICATORS_ASSISTANCE,
  INDICATORS_ASSISTANCE_ALL,
  ASSISTANCE_STATUS_ACTIONS,
  SAVE_ASSISTANCE_JUSTIFICATION
} from "../ActionTypes";

const initialState = {
  myTodayAssistance: [],
  assistanceListByWorker: [],
  assistanceListAll: [],
  assistanceList: [],
  meta: {
    total: 0,
    last_page: 1,
  },
  myAssistanceList: [],
  myAssistanceDetailList: [],
  assistanceIndicators:{
    tardanzas:0,
    faltas:0,
    hRealizadas:0,
    hCompensar:0,
  },
  assistanceIndicatorsAll:{
    tardanzas:0,
    faltas:0,
    hRealizadas:0,
    hCompensar:0,
  },
  assistanceStatusActions:0,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case MY_TODAY_ASSISTANCE: {
      return {
        ...state,
        myTodayAssistance: action.payload,
      }
    }
    case LIST_ASSISTANCE_BY_WORKER: {
      return {
        ...state,
        assistanceListByWorker: action.payload,
      }
    }
    case LIST_ASSISTANCE_ALL: {
      return {
        ...state,
        assistanceListAll: action.payload,
      }
    }
    case LIST_ASSISTANCE: {
      return {
        ...state,
        assistanceList: action.payload,
      }
    }
    case MY_ASSISTANCE:
      return {
        ...state,
        myAssistanceList: action.payload
      }
    case MY_ASSISTANCE_DETAIL:
      return {
        ...state,
        myAssistanceDetailList: action.payload
      }
    case SAVE_ASSISTANCE:
      return {
        ...state,
      }
      case SAVE_ASSISTANCE_JUSTIFICATION:
        return {
          ...state,
        }
      case INDICATORS_ASSISTANCE: {
        return {
          ...state,
          assistanceIndicators: action.payload,
        }
      }
      case INDICATORS_ASSISTANCE_ALL: {
        return {
          ...state,
          assistanceIndicatorsAll: action.payload,
        }
      }
      case ASSISTANCE_STATUS_ACTIONS: {
          return {
              ...state,
              assistanceStatusActions:action.payload
          }
      }
    default:
      return state;
  }
}