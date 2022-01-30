
import { GET_CART, GET_ORDERS, GET_PRODUCT } from "../../../Redux/constants/action-types";

const initialState = {
    cart : [],
    saveForLater : [],
    product : {},
    OpenOrders : [],
    DeliveredOrders : [],
    CancelledOrders : []
};

function cartReducer(state = initialState, action) {
    if (action.type === GET_CART) {
        console.log("action payload", action.payload.Cart)
        return Object.assign({}, state, { 
            cart: action.payload.Cart ,
            saveForLater : action.payload.SaveForLater
        });
    }
    else if (action.type === GET_ORDERS) {
        console.log("action payload : ", action.payload)
        return Object.assign({}, state, { 
            OpenOrders : action.payload.OpenOrders,
            DeliveredOrders : action.payload.DeliveredOrders,
            CancelledOrders : action.payload.CancelledOrders
        });
    }
    else if (action.type === GET_PRODUCT){
        console.log("action payload PRODUCT : ", action.payload)
        return Object.assign({}, state, { 
            product : action.payload
        });
    }
    return state;
}

export default cartReducer;
