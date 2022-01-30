import { CUSTOMER_GET_PRODUCTS } from '../../constants/action-types';

const initialState = {
    name : "",
    categories : [],
    sort : "",
};

const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_GET_PRODUCTS:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                products: action.payload.docs,
                totalDocs: action.payload.totalDocs,
                limit: action.payload.limit,
                totalPages: action.payload.totalPages,
                page: action.payload.page,
                pagingCounter: action.payload.pagingCounter,
                hasPrevPage: action.payload.hasPrevPage,
                hasNextPage: action.payload.hasNextPage,
                prevPage: action.payload.prevPage,
                nextPage: action.payload.nextPage,
                name : action.payload.name,
                categories : action.payload.categories,
                sort: action.payload.sort,
            }
        default:
            return state;
    }
}

export default customerProductReducer;
