export const SAVE_NAMEPIC_DETAILS_TO_STORE = "SAVE_NAMEPIC_DETAILS_TO_STORE";

//target action

export function saveCustomerNamepictoStore(data){
    return function(dispatch){
        console.log('Inside savenamepicDetailsToStore action');
        dispatch({
            type: SAVE_NAMEPIC_DETAILS_TO_STORE,
            payload: data
        });        
    }
}