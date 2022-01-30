
import axios from 'axios';
import { GET_CART, GET_ORDERS, GET_PRODUCT } from "../../../Redux/constants/action-types";
const { backendURL } = require("../../../config");


export const getCart = (data) => dispatch => {
    console.log("inside get cart action");
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(backendURL + '/customer/getCart', data,config)
        .then(response => {
            console.log("resonse", response.data)
            return dispatch(setCart(response.data))
        })
};
export const updateCart = (data) => dispatch => {
    console.log("inside get cart action");
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(backendURL + '/customer/updateCart', data, config)
        .then(response => {
            console.log("DATA  :: " + response.data)
            if(response.data === true){
                axios.defaults.withCredentials = true;
                axios.post(backendURL + '/customer/getCart', data)
                    .then(response => {
                        console.log("resonse", response.data)
                        return dispatch(setCart(response.data))
                    })
            }
        })
} 

export const setCart = (data) => ({
    type: GET_CART,
    payload : data
})

export const placeOrder = (data) => dispatch => {
    console.log("Inside place Order")
    
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(backendURL + '/orders/placeOrder' , data, config).then(res => {
        dispatch(getCart({id : localStorage.getItem("id")}))
    })
}

export const cancelOrder = data => dispatch => {
    
    data.status = "Cancel"
    axios.post(backendURL + "/orders/updateOrder" , data).then(res => {
        console.log(res.data);
        dispatch(getOrders({CustomerID : localStorage.getItem('id')}))
    })
}
export const getOrders = (data) => dispatch => {
    console.log("Inside place Order")
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.get(backendURL + "/orders/?CustomerID=" + data.CustomerID,config).then(res => {
        console.log("ORDERS : " + res.data)
        dispatch(setOrders(res.data))
    })
}

export const getProduct = data => dispatch =>{
    console.log("Inside get product")
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(backendURL + "/customer/product/particularProduct",{id : data}, config).then(res => {
        console.log(res.data)
        dispatch ({
            type : GET_PRODUCT,
            payload : res.data
        })
    }).catch((err) => {
        console.log("ERROR ::::>" + err )
    })
}

export const setOrders = (data) => ({
    type : GET_ORDERS,
    payload : {...data}
})

export const setProduct = (data) => ({
    type : GET_PRODUCT,
    payload : data
})

