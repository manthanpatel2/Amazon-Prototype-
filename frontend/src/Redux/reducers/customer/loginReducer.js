
import { CUSTOMER_LOGIN, CUSTOMER_LOGOUT } from "../../../Redux/constants/action-types";

const initialState = {
    signInSuccess: null, message: ""
};

function customerLoginReducer(state = initialState, action) {
    if (action.type === CUSTOMER_LOGIN) {
        console.log("action payload", action.payload)
        return Object.assign({}, state, { signInSuccess: action.payload.signInSuccess, message: action.payload.message });
    }
    else if (action.type === CUSTOMER_LOGOUT) {
        return Object.assign({}, state, {
            signInSuccess: "", message: ""
        });
    }
    return state;
}

export default customerLoginReducer;
