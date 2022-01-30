import axios from 'axios';
import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../../constants/action-types";
const { backendURL } = require("../../../config");
const jwt_decode = require('jwt-decode');

export const productViewClickListnerApi = (productId) => dispatch => {
    console.log("Inside productViewClickListnerApi");

    axios.post(backendURL + '/admin/analytics/productCount', { productId: productId })
        .then(response => {
            // console.log("resonse", response.data)
        })
}