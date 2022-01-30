
import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../../../Redux/constants/action-types";

const initialState = {
    signInSuccess: null, message: ""
};

function adminLoginReducer(state = initialState, action) {
    if (action.type === ADMIN_LOGIN) {
        console.log("action payload", action.payload)
        return Object.assign({}, state, { signInSuccess: action.payload.signInSuccess, message: action.payload.message });
    }
    else if (action.type === ADMIN_LOGOUT) {
        return Object.assign({}, state, {
            id: '',

        });
    }
    return state;
}

export default adminLoginReducer;
