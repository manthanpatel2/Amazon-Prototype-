import { CUSTOMER_GET_REVIEWS_FOR_PRODUCT, CUSTOMER_ADD_REVIEW } from '../../constants/action-types';

const initialState = {
};

const customerReviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_GET_REVIEWS_FOR_PRODUCT:
            // console.log("Details Payload:")
            // console.log(action.payload)
            return {
                productId: action.payload.productId,
                reviews: action.payload.reviewsData,
            }
        case CUSTOMER_ADD_REVIEW:
            if (state.reviews){
                return {
                    ...state,
                    reviews: [action.payload, ...state.reviews],
                }
            }else{
                return {
                    ...state,
                    reviews: action.payload,
                }
            }
           
        default:
            return state;
    }
}

export default customerReviewReducer;