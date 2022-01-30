import {CUSTOMER_GET_PRODUCTS} from "../../constants/action-types";
import axios from "axios";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL +"/customer/product";

export const getProducts = (productData, page, limit, Name, Categories, sort) => dispatch => {
    axios.defaults.withCredentials = true;
    // console.log(" Inside getProducts :");
    // console.log(" page :", page);
    // console.log(" limit :", limit);
    if(!Name){
        Name = ""
    }
    if (!page) {
        page = 1;
    }
    if (!limit) {
        limit = 8;
    }
    if (productData) {
        if (page > productData.totalPages) {
            page = 1
        }
    }
    const data = {
        page: page,
        limit: limit,
        name: Name,
        Categories: Categories,
        sort: sort,
    }
    console.log("data", JSON.stringify(data));
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    // axios.get(`${backendURL}/customer/product/products?page=${page}&limit=${limit}&sellerId=${sellerId}`, config)
    axios.post(`${ROOT_URL}/products`, data, config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response));
            let data = { ...response.data }
                data.name = Name;
                data.categories = Categories;
                data.sort = sort; 

            if (response.status == 200) {
                dispatch({
                    type: CUSTOMER_GET_PRODUCTS,
                    payload: data,
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
            })
}

export const giveRatingToProduct = (product_id, rating) => dispatch => {
    console.log("Inside giveRatingToProduct");

    const data ={
        id: product_id,
        Rating: rating,
    }
    console.log("Inside giveRatingToProduct",data);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(`${ROOT_URL}/updateRating`, data, config)
        .then(response => {
            // console.log("resonse", response.data)
        })
}