import axios from 'axios';
import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../../constants/action-types";
const { backendURL } = require("../../../config");
const jwt_decode = require('jwt-decode');

export const adminLogin = (data) => {
    return (dispatch) => {
        console.log("inside login action");
        axios.defaults.withCredentials = true;
        axios.post(backendURL + '/admin/signIn', data)
            .then(response => {
                return dispatch(setLoginCredentials(response.data.token))
            })
    }
};

export const setLoginCredentials = (token) => {
    var decoded = jwt_decode(token.split(' ')[1]);
    if (decoded.signInSuccess) {
        localStorage.setItem("token", token)
        localStorage.setItem("id", decoded.AID);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem("type", "admin");
    }
    return {
        type: ADMIN_LOGIN,
        payload: { ...decoded }
    }
}

export const adminSignUp = (data) => dispatch => {
    console.log("inside signup action");
    axios.defaults.withCredentials = true;
    axios.post(backendURL + '/admin/signUp', data)
        .then(response => {
            // console.log("resonse", response.data)
            return dispatch(setLoginCredentials(response.data.token))
        })
}

export const logout = () => ({
    type: ADMIN_LOGOUT
})
