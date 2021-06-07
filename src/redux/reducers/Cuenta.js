import {
    SHOW_COMPROBANTE,
    LIST_BILLS,
    LIST_BILLS_BY_SECTOR,
    INDICATORS_BILLS,
    LIST_PENDINGS,
    INDICATORS_PENDINGS,
    LIST_MEMBERSHIPS,
    BILL_STATUS_ACTIONS,
    SAVE_BILL,
    LIST_REPEATED,
    BILL_DASHBOARD_DATA
} from "../ActionTypes";

const INIT_STATE = {
    comprobanteObject: [],
    billList: [],
    billListBySector: [],
    billIndicators: [],
    pendingsIndicators: [],
    pendingsList: [],
    membershipList: [],
    billsStatusActions: 0,
    reapetedList: [],
    billDashboard: []
};

const states = (state = INIT_STATE, action) => {
    switch (action.type) {
        case BILL_DASHBOARD_DATA: {
            return {
                ...state,
                billDashboard: action.payload
            }
        }
        case LIST_REPEATED: {
            return {
                ...state,
                reapetedList: action.payload
            }
        }
        case LIST_BILLS_BY_SECTOR: {
            return {
                ...state,
                billListBySector: action.payload
            }
        }
        case LIST_BILLS: {
            return {
                ...state,
                billList: action.payload
            }
        }
        case INDICATORS_BILLS: {
            return {
                ...state,
                billIndicators: action.payload
            }
        }
        case INDICATORS_PENDINGS: {
            return {
                ...state,
                pendingsIndicators: action.payload
            }
        }
        case LIST_PENDINGS: {
            return {
                ...state,
                pendingsList: action.payload
            }
        }
        case LIST_MEMBERSHIPS: {
            return {
                ...state,
                membershipList: action.payload
            }
        }
        case SHOW_COMPROBANTE: {
            return {
                ...state,
                comprobanteObject: action.payload
            }
        }
        case BILL_STATUS_ACTIONS: {
            return {
                ...state,
                billsStatusActions: action.payload
            }
        }
        case SAVE_BILL:
            return {
                ...state,
            }
        default:
            return state;
    }
}
export default states;