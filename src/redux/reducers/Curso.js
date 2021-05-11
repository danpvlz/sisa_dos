import {
    LIST_CURSOS,
    SAVE_CURSO,
    UPDATE_CURSO,
    CURSOS_STATUS_ACTIONS,
    GET_CURSO,
    FILTER_CURSOS,
} from "../ActionTypes";

const INIT_STATE = {
    cursoList: [],
    cursoStatusActions: 0,
    cursobject:[],
    filterCursos: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILTER_CURSOS: {
            return {
                ...state,
                filterCursos: action.payload
            }
        }
        case LIST_CURSOS: {
            return {
                ...state,
                cursoList: action.payload
            }
        }
        case SAVE_CURSO:
            return {
                ...state,
            }
        case UPDATE_CURSO:
            return {
                ...state,
            }
            case GET_CURSO: {
                return {
                    ...state,
                    cursobject : action.payload
                }
            }
        case CURSOS_STATUS_ACTIONS: {
            return {
                ...state,
                cursoStatusActions: action.payload
            }
        }
        default:
            return state;
    }
}
