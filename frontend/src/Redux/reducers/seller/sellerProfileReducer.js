import { FETCH_SELLER_PROFILE, UPDATE_SELLER_ADDRESS, UPDAT_SELLER_NAMPIC } from "../../constants/action-types";
import update from 'react-addons-update';
const initialState = {

};

function customerProfileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SELLER_PROFILE:
            return {
                ...state,
                ...action.payload
            }
        case UPDAT_SELLER_NAMPIC:
            return {
                ...state,
                Name: action.payload.Name,
                ProfileURL: action.payload.ProfileURL
            }
        case UPDATE_SELLER_ADDRESS:
            return  {
                ...state,
                Address: action.payload,
            }
        default:
            return state;
    }
}

export default customerProfileReducer;
