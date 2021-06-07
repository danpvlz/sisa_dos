import {
  FILTER_DEBCOLLECTOR,
} from "../ActionTypes";

const INIT_STATE = {
  debCollectorFilter: [],
};

const states = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FILTER_DEBCOLLECTOR: {
      return {
        ...state,
        debCollectorFilter: action.payload,
      }
    }
    default:
      return state;
  }
}
export default states;