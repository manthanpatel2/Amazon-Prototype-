import { CUSTOMER_GET_REVIEWS_FOR_PRODUCT, CUSTOMER_ADD_REVIEW } from "../../constants/action-types";
import axios from "axios";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL + "/customer/review";


export const getReviewsForProduct = (productId) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside getReviewsForProduct :");
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.get(`${ROOT_URL}/reviews?product_id=${productId}`, config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response.data));
            if (response.status == 200) {
                dispatch({
                    type: CUSTOMER_GET_REVIEWS_FOR_PRODUCT,
                    payload:  {
                        reviewsData: response.data,
                        productId: productId,
                    }
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
            })
}
export const addReview = (review) => dispatch => {
    axios.defaults.withCredentials = true;
    // console.log(" Inside addReviewsForProduct :");
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(`${ROOT_URL}/addReview`, review,config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: CUSTOMER_ADD_REVIEW ,
                    payload: review,
                })
            }
        },
            error => {
                console.log(" addReview error:", JSON.stringify(error));
            })
}