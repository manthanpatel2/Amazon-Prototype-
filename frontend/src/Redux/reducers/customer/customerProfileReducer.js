import { SAVE_ADDRESS_DETAILS_TO_STORE, SAVE_NAMEPIC_DETAILS_TO_STORE, SAVE_PAYMENT_DETAILS_TO_STORE,
     EDIT_ADDRESS_DETAILS_TO_STORE, FETCH_CUSTOMER_PROFILE, DELETE_CUSTOMER_PAYEMET, UPDATE_CUSTOMER_PAYMENT } from "../../../Redux/constants/action-types";
import update from 'react-addons-update';
const initialState = {

};

function customerProfileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CUSTOMER_PROFILE:
            return {
                ...state,
                ...action.payload
            }
        case SAVE_ADDRESS_DETAILS_TO_STORE:
            return {
                ...state,
                Address: [action.payload, ...state.Address]
            }
        case SAVE_NAMEPIC_DETAILS_TO_STORE:
            return {
                ...state,
                Name: action.payload.Name,
                ProfileURL: action.payload.ProfileURL
            }
        case SAVE_PAYMENT_DETAILS_TO_STORE:
            return {
                ...state,

            }
        case EDIT_ADDRESS_DETAILS_TO_STORE:
            return  {
                ...state,
                Address: action.payload,
            }

        case UPDATE_CUSTOMER_PAYMENT:
            return update(state, {
                Payments: {
                    [action.payload.index]: { $set: action.payload.card}
                }
        });
        case DELETE_CUSTOMER_PAYEMET:
            return {
                ...state,
                Payments: [ 
                    ...state.Payments.slice(0, action.payload),
                    ...state.Payments.slice(action.payload)
                ]
            }
        default:
            return state;
    }
}

export default customerProfileReducer;
