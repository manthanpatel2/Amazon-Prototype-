import { SELLER_ADD_PRODUCT, SELLER_GET_PRODUCTS, SELLER_UPDATE_PRODUCT, SELLER_GET_ORDERS , SELLER_DELETE_PRODUCT } from "../../constants/action-types";

import axios from "axios";
const { backendURL } = require("../../../config");

export const getSellerOrders = (data) => dispatch => {
    console.log("Inside place Order")
    axios.get(`${backendURL}/orders/?SellerID=${data.SellerID}`).then(res => {
        console.log("ORDERS : " + res.data)
        dispatch(setOrders(res.data))
    }).catch((err) => {
        console.log("ERROR ::::>" + err)
    })
}
export const setOrders = (data) => ({
    type: SELLER_GET_ORDERS,
    payload: data
})

export const changeStatus = (data) => dispatch => {
    console.log("Inside Change Status")
    axios.post(`${backendURL}/admin/orders/changeStatus`, data).then(resp => {
        dispatch(getSellerOrders({SellerID : localStorage.getItem("id")}))
    })
}
const ROOT_URL = backendURL + "/seller/product";

export const getProducts = (productData, SellerId, page, limit, Name, Categories, sort) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside getProducts :");
    console.log(" page :", page);
    console.log(" limit :", limit);
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
        SellerId: SellerId,
        name: Name,
        Categories: Categories,
        sort: sort
    }
    console.log("data", JSON.stringify(data));
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    // axios.get(`${backendURL}/customer/product/products?page=${page}&limit=${limit}&sellerId=${sellerId}`, config)
    axios.post(`${backendURL}/customer/product/products`, data, config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response));
            let data = { ...response.data }
            data.name = Name;
            data.categories = Categories;
            data.sort = sort;
            if (response.status == 200) {
                dispatch({
                    type: SELLER_GET_PRODUCTS,
                    payload: data,
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
            })
}

export const addProduct = (product, productImages) => dispatch => {



    console.log("Images: ", JSON.stringify(productImages));

    const formData = new FormData();
    formData.append('Product', JSON.stringify(product));
    formData.append('Name', product.Name);
    formData.append('SellerName', product.SellerName);
    for (const key in productImages) {
        formData.append('Images', productImages[key]);
    }


    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        }
    }

    console.log("Inside Add product: ", JSON.stringify(product));

    axios.post(`${ROOT_URL}/addProduct`, formData, config)
        .then(response => {
            console.log("addProduct: ", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: SELLER_ADD_PRODUCT,
                    payload: response.data,
                })
            }
        },
            error => {
                console.log(" addProduct error:", JSON.stringify(error));
            })
}

export const updateSellerProduct = (product, id) => dispatch => {
    if (typeof (product) == "undefined" || typeof (id) == "undefined") {
        return;
    }

    const data = {
        product: product,
        index: id,
    }
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(`${ROOT_URL}/updateProduct`, product, config)
        .then(response => {
            console.log("updateProduct: ", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: SELLER_UPDATE_PRODUCT,
                    payload: data,
                })
            }
        },
            error => {
                console.log(" updateProduct error:", JSON.stringify(error));
            })

}

export const deleteProduct = (product_id, id) => dispatch => {
    // if (typeof (product) == "undefined" || typeof (id) == "undefined") {
    //     return;
    // }
    console.log("Product Id:",product_id);
    console.log("Id:",id);
    console.log("inside delete product");
    // dispatch({
    //     type: SELLER_DELETE_PRODUCT,
    //     payload: id,
    // })
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(`${ROOT_URL}/deleteProduct`, {product_id}, config)
        .then(response => {
            console.log("deleteProduct: ", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: SELLER_DELETE_PRODUCT,
                    payload: id,
                })
            }
        },
         error => {
                console.log(" deleteProduct error:", JSON.stringify(error));
            })

}
