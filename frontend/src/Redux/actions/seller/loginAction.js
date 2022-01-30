
import axios from 'axios';
import { SELLER_LOGIN, SELLER_LOGOUT } from "../../../Redux/constants/action-types";
const { backendURL } = require("../../../config");
const jwt_decode = require('jwt-decode');

export const sellerLogin = (data) => dispatch => {
    console.log("inside login action");
    axios.defaults.withCredentials = true;
    axios.post(backendURL + '/seller/signIn', data)
        .then(response => {
            // console.log("resonse", response)
            return dispatch(setLoginCredentials(response.data.token))
        })
};

const setLoginCredentials = (token) => {
    var decoded = jwt_decode(token.split(' ')[1]);
    if (decoded.signInSuccess) {
        localStorage.setItem("token", token)
        localStorage.setItem("id", decoded.SID);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem("type", "seller");
    }
    return {
        type: SELLER_LOGIN,
        payload: { ...decoded }
    }
}

export const sellerSignUp = (data) => dispatch => {
    console.log("inside signup action");
    axios.defaults.withCredentials = true;
    axios.post(backendURL + '/seller/signUp', data)
        .then(response => {
            // console.log("resonse", response.data)
            return dispatch(setLoginCredentials(response.data.token))
        })
}

export const logout = () => ({
    type: SELLER_LOGOUT
})
