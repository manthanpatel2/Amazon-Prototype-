import { SELLER_GET_PRODUCTS, SELLER_ADD_PRODUCT, SELLER_UPDATE_PRODUCT ,SELLER_DELETE_PRODUCT, SELLER_GET_ORDERS} from '../../constants/action-types';

import update from 'react-addons-update';

const initialState = {
    name : "",
    categories : [],
    sort : ""
};

const sellerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELLER_GET_PRODUCTS:
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
                sort : action.payload.sort,
            }
        case SELLER_ADD_PRODUCT:

            return {
                ...state,
                products: [action.payload, ...state.products],
            };
        case SELLER_UPDATE_PRODUCT:
            return update(state, {
                    products: {
                        [action.payload.index]: { $set: action.payload.product}
                    }
            });
        case SELLER_GET_ORDERS: 
            return {
                ...state,
                OpenOrders : action.payload.OpenOrders,
                CancelledOrders : action.payload.CancelledOrders,
                DeliveredOrders : action.payload.Delivered
            }
        case SELLER_DELETE_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products.slice(0, action.payload),
                    ...state.products.slice(action.payload + 1)
                ]
            }            
        default:
            return state;
    }
}

export default sellerProductReducer;
