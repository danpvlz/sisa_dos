import {
    LIST_INSCRIPCION,
    SAVE_INSCRIPCION,
    UPDATE_INSCRIPCION,
    INSCRIPCION_STATUS_ACTIONS,
} from "../ActionTypes";

const INIT_STATE = {
    inscripcionList: [],
    inscripcionStatusActions: 0,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_INSCRIPCION: {
            return {
                ...state,
                inscripcionList: action.payload
            }
        }
        case SAVE_INSCRIPCION:
            return {
                ...state,
            }
        case UPDATE_INSCRIPCION:
            return {
                ...state,
            }
        case INSCRIPCION_STATUS_ACTIONS: {
            return {
                ...state,
                inscripcionStatusActions: action.payload
            }
        }
        default:
            return state;
    }
}
