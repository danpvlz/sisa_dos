import { LIST_ASSISTANCE, LIST_MY_ASSISTANCE, SAVE_ASSISTANCE } from "../ActionTypes";

const initialState = {
  assistanceList: [],
  meta: {
    total: 0,
    last_page:1,
  },
  my_asistencia_list: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_ASSISTANCE: {
      return {
        ...state,
        assistanceList: action.payload,
        meta:action.payload.meta
      }
    }
    case LIST_MY_ASSISTANCE:
      return {
        ...state,
        my_asistencia_list: [...state.my_asistencia_list, action.payload]
      }
    case SAVE_ASSISTANCE:
      return {
        ...state,
      }
    default:
      return state;
  }
}