import {
  LIST_WORKER,
} from "../ActionTypes";

const INIT_STATE = {
  workerList: [],
  meta: {
    totalData: 0,
    pageSize: 0,
    current: 0,
    totalPages: 0
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIST_WORKER: {
      return {
        ...state,
        workerList: action.payload,
      }
    }
    default:
      return state;
  }
}
