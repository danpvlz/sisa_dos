import {
    LIST_PARTICIPANTES,
    GET_PARTICIPANTE,
    SAVE_PARTICIPANTE,
    UPDATE_PARTICIPANTE,
    PARTICIPANTES_STATUS_ACTIONS,
    FILTER_PARTICIPANTS,
} from "../ActionTypes";

const INIT_STATE = {
    participanteList: [],
    participanteStatusActions: 0,
    participanteObject: [],
    filterParticipants: [],
};

const states = (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILTER_PARTICIPANTS: {
            return {
                ...state,
                filterParticipants: action.payload
            }
        }
        case LIST_PARTICIPANTES: {
            return {
                ...state,
                participanteList: action.payload
            }
        }
        case SAVE_PARTICIPANTE:
            return {
                ...state,
            }
        case GET_PARTICIPANTE: {
            return {
                ...state,
                participanteObject: action.payload
            }
        }
        case UPDATE_PARTICIPANTE:
            return {
                ...state,
            }
        case PARTICIPANTES_STATUS_ACTIONS: {
            return {
                ...state,
                participanteStatusActions: action.payload
            }
        }
        default:
            return state;
    }
}
export default states;