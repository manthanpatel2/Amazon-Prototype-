import axios from 'axios';
import {
    SAVE_ADDRESS_DETAILS_TO_STORE, SAVE_NAMEPIC_DETAILS_TO_STORE,
    SAVE_PAYMENT_DETAILS_TO_STORE, EDIT_ADDRESS_DETAILS_TO_STORE, FETCH_CUSTOMER_PROFILE,
    DELETE_CUSTOMER_PAYEMET, UPDATE_CUSTOMER_PAYMENT
} from "../../../Redux/constants/action-types";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL + "/customer/profile";


export const deletPaymentOption = (data, id) => dispatch => {
    console.log("deletPaymentOption called", id);
    dispatch({
        type: DELETE_CUSTOMER_PAYEMET,
        payload: id,
    });
    // })
    //         axios.post(`${ROOT_URL}/updatecard`, data)
    //         .then(response => {
    //             console.log("Response", response);
    //             if (response.status === 200) {
    //                 console.log("Inside delete card");
    //                 dispatch({
    //                     type: DELETE_CUSTOMER_PAYEMET,
    //                     payload: id,
    //                 })
    //             }
    //         });
}

export const deleteCustomerAddress = () => dispatch => {

}

export const updatePaymentOptions = (card, id) => dispatch => {

    console.log("updatePaymentOptions called", id);
    card.id = id;
    axios.post(backendURL + "/customer/profile/addCard", card)
        .then(response => {

            if (response.status == 200) {
                dispatch({
                    type: UPDATE_CUSTOMER_PAYMENT,
                    payload: {
                        card: card,
                        index: id
                    },
                })
            }
        },
            error => {
                console.log(" updateProduct error:", JSON.stringify(error));
            })

}

export const fetchCustomerProfile = (customerId) => dispatch => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.get(`${ROOT_URL}/fetchprofile?customerId=${customerId}`, config)
        .then(response => {

            if (response.status == 200) {
                dispatch({
                    type: FETCH_CUSTOMER_PROFILE,
                    payload: response.data.docs,
                })
            }
        },
            error => {
                console.log(" updateProduct error:", JSON.stringify(error));
            })
}

export const saveCustomerAddress = (data) => dispatch => {
    console.log('Inside saveaddressDetailsToStore action');
    dispatch({
        type: SAVE_ADDRESS_DETAILS_TO_STORE,
        payload: data.address
    });
    // axios.post(`${ROOT_URL}/updateaddress`, data)
    //     .then(response => {
    //         console.log(response);
    //         console.log("address val", this.state.address);
    //         dispatch({
    //             type: SAVE_ADDRESS_DETAILS_TO_STORE,
    //             payload: data
    //         });
    //     }, (err) => {
    //         console.log(err);
    //     });
    // }
}

export function saveCustomerNamepic(data) {
    return function (dispatch) {
        console.log('Inside savenamepicDetailsToStore action');
        dispatch({
            type: SAVE_NAMEPIC_DETAILS_TO_STORE,
            payload: data
        });
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            }
        }
        axios.post(`${ROOT_URL}/updateaddress`, data, config)
            .then(response => {
                console.log(response);
                console.log("address val", this.state.address);
                dispatch({
                    type: SAVE_NAMEPIC_DETAILS_TO_STORE,
                    payload: data
                });
            }, (err) => {
                console.log(err);
            });
    }
}

export function saveCustomerPayment(data) {
    return function (dispatch) {
        console.log('Inside savepaymentDetailsToStore action');
        // dispatch({
        //     type: SAVE_PAYMENT_DETAILS_TO_STORE,
        //     payload: data
        // });
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            }
        }
        axios.post(`${ROOT_URL}/updateaddress`, data, config)
            .then(response => {
                console.log(response);
                console.log("address val", this.state.address);
                dispatch({
                    type: SAVE_PAYMENT_DETAILS_TO_STORE,
                    payload: data
                });
            }, (err) => {
                console.log(err);
            });
    }
}

export const editCustomerAddress = (data) => dispatch => {

    console.log('Inside savepaymentDetailsToStore action', data);
    dispatch({
        type: EDIT_ADDRESS_DETAILS_TO_STORE,
        payload: data.address
    });
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(`${ROOT_URL}/updateaddress`, data, config)
        .then(response => {
            console.log(response);
            // console.log("address val", this.state.address);
            // dispatch({
            //     type: EDIT_ADDRESS_DETAILS_TO_STORE,
            //     payload: data
            // });
        }, (err) => {
            console.log(err);
        });
}

export const updateNamePic = (customerId, name, profileImage) => dispatch => {
    console.log("Images: ", JSON.stringify(profileImage));

    const formData = new FormData();

    formData.append('CustomerID', customerId);
    formData.append('Name', name);
    formData.append('Image', profileImage);

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post(`${ROOT_URL}/updatenamepic`, formData, config)
        .then(response => {
            console.log(response);
            dispatch({
                type: SAVE_NAMEPIC_DETAILS_TO_STORE,
                payload: {
                    Name: name,
                    ProfileURL: response.data.ProfileURL
                }
            });
        }, (err) => {
            console.log(err);
        });
} 