export const SAVE_PAYMENT_DETAILS_TO_STORE = "SAVE_PAYMENT_DETAILS_TO_STORE";

//target action

export function saveCustomerPaymenttoStore(data){
    return function(dispatch){
        console.log('Inside savepaymentDetailsToStore action');
        dispatch({
            type: SAVE_PAYMENT_DETAILS_TO_STORE,
            payload: data
        });        
    }
}