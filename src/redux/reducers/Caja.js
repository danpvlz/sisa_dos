import {
  LIST_BILLS_CAJA,
  INDICATORS_BILLS_CAJA,
  DASHBOARD_DATA,
  DASHBOARD_DATA_BY_AREA
} from "../ActionTypes";

const INIT_STATE = {
  cajaDashboard: [],
  cajaDashboardByArea: [],
  billListCaja: [],
  billIndicatorsCaja: [],
};

const states = (state = INIT_STATE, action) => {
  switch (action.type) {
    case DASHBOARD_DATA: {
      return {
        ...state,
        cajaDashboard: action.payload
      }
    }
    case DASHBOARD_DATA_BY_AREA: {
      return {
        ...state,
        cajaDashboardByArea: action.payload
      }
    }
    case LIST_BILLS_CAJA: {
      return {
        ...state,
        billListCaja: action.payload
      }
    }
    case INDICATORS_BILLS_CAJA: {
      return {
        ...state,
        billIndicatorsCaja: action.payload
      }
    }
    default:
      return state;
  }
}
export default states;