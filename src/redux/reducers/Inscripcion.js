import {
    LIST_INSCRIPTIONS,
    GET_INSCRIPTION,
    SAVE_INSCRIPTION,
    UPDATE_INSCRIPTION,
    INSCRIPTION_STATUS_ACTIONS,
} from "../ActionTypes";

const INIT_STATE = {
    inscripcionList: [],
    inscripcionStatusActions: 0,
    inscripcionObject: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_INSCRIPTIONS: {
            return {
                ...state,
                inscripcionList: action.payload
            }
        }
        case GET_INSCRIPTION: {
            return {
                ...state,
                inscripcionObject: action.payload
            }
        }
        case SAVE_INSCRIPTION:
            return {
                ...state,
            }
        case UPDATE_INSCRIPTION:
            return {
                ...state,
            }
        case INSCRIPTION_STATUS_ACTIONS: {
            return {
                ...state,
                inscripcionStatusActions: action.payload
            }
        }
        default:
            return state;
    }
}
