
import { SELLER_LOGIN, SELLER_LOGOUT } from "../../../Redux/constants/action-types";

const initialState = {
    signInSuccess: null, message: ""
};

function sellerLoginReducer(state = initialState, action) {
    if (action.type === SELLER_LOGIN) {
        // console.log("action payload", action.payload)
        return Object.assign({}, state, { signInSuccess: action.payload.signInSuccess, message: action.payload.message });
    }
    else if (action.type === SELLER_LOGOUT) {
        return Object.assign({}, state, {
            id: '',

        });
    }
    return state;
}

export default sellerLoginReducer;
