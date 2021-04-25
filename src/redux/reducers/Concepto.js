import {
  FILTER_CONCEPT,
  LIST_CONCEPTO,
  SAVE_CONCEPT,
  UPDATE_CONCEPT,
  CONCEPT_STATUS_ACTIONS,
  GET_CONCEPT,
  FILTER_AREAS,
  FILTER_CATEGORIES,
} from "../ActionTypes";

const INIT_STATE = {
  areasFilter:[],
  categoriasFilter:[],
  conceptoFilter:[],
  conceptoList:[],
  conceptStatusActions: 0,
  conceptObject: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FILTER_AREAS: {
      return {
        ...state,
        areasFilter: action.payload,
      }
    }
    case FILTER_CATEGORIES: {
      return {
        ...state,
        categoriasFilter: action.payload,
      }
    }
    case FILTER_CONCEPT: {
      return {
        ...state,
        conceptoFilter: action.payload,
      }
    }
    case LIST_CONCEPTO: {
      return {
        ...state,
        conceptoList: action.payload,
      }
    }
    case GET_CONCEPT: {
        return {
            ...state,
            conceptObject : action.payload
        }
    }
    case SAVE_CONCEPT: {
        return {
            ...state
        }
    }
    case UPDATE_CONCEPT: {
        return {
            ...state
        }
    }
    case CONCEPT_STATUS_ACTIONS: {
        return {
            ...state,
            conceptStatusActions:action.payload
        }
    }
    default:
      return state;
  }
}
