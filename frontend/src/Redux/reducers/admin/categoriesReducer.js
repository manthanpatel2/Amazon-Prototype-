import { FETCH_ALL_CATEGORIES } from "../../../Redux/constants/action-types";

const initialState = {
    Categories: []
};

function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_CATEGORIES:
            return {
                ...state,
                Categories: action.payload
            }
        default:
                return state;
        }
}

export default categoriesReducer;