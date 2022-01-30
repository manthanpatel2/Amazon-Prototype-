
import { GET_PAYMENT_DETAILS , ADD_PAYMENT_DETAILS } from "../../../Redux/constants/action-types";

const initialState = {
    savedAddress : [],
    payment : [],
    cart : []
};

function customerPaymentReducer(state = initialState, action) {

    if (action.type === GET_PAYMENT_DETAILS) {
        console.log("AP",action.payload)
        return Object.assign({}, state, {
            payment: action.payload.result.Payments,
            savedAddress: action.payload.result.Address,
            cart: action.payload.result.Cart,
        });
    } else if (action.type === ADD_PAYMENT_DETAILS) {
        return {
            ...state,
            payment : [action.payload , ...state.payment]
        }
    }
    return state;
}

export default customerPaymentReducer;
