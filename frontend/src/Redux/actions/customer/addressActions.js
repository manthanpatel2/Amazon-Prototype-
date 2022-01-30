export const SAVE_ADDRESS_DETAILS_TO_STORE = "SAVE_ADDRESS_DETAILS_TO_STORE";

//target action

export function saveCustomerAddresstoStore(data){
    return function(dispatch){
        console.log('Inside saveaddressDetailsToStore action');
        dispatch({
            type: SAVE_ADDRESS_DETAILS_TO_STORE,
            payload: data
        });        
    }
}