import { LIST_ASSISTANCE, LIST_MY_ASSISTANCE, SAVE_ASSISTANCE } from "../ActionTypes";

const initialState = {
  asistencia_list: [],
  my_asistencia_list: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_ASSISTANCE:
      return {
        ...state,
        asistencia_list: [...state.asistencia_list, action.payload]
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