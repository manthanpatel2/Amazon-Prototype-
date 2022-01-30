import axios from 'axios';
import {FETCH_ALL_CATEGORIES} from "../../../Redux/constants/action-types";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL + "/admin/category";

export const fetchAllCategories = () => dispatch => {
    axios.get(`${ROOT_URL}/getCategory`)
        .then(response => {
            console.log(" fetchAllCategories response:", JSON.stringify(response.data));
            if (response.status == 200) {
                dispatch({
                    type: FETCH_ALL_CATEGORIES,
                    payload: response.data[0].Categories,
                })
            }
        },
            error => {
                console.log(" fetchAllCategories error:", JSON.stringify(error));
            })
}