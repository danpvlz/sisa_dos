import {
    LIST_PAGOS,
} from "../ActionTypes";

const INIT_STATE = {
    pagoList: [],
};

const states = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_PAGOS: {
            return {
                ...state,
                pagoList: action.payload
            }
        }
        default:
            return state;
    }
}
export default states;