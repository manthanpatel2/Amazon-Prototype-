import axios from 'axios';
import { FETCH_SELLER_PROFILE, UPDAT_SELLER_NAMPIC, UPDATE_SELLER_ADDRESS} from "../../../Redux/constants/action-types";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL + "/seller/profile";


export const fetchSellerProfile = (sellerId) => dispatch => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.get(`${ROOT_URL}/fetchprofile_seller?sellerId=${sellerId}`,config)
        .then(response => {

            if (response.status == 200) {
                dispatch({
                    type: FETCH_SELLER_PROFILE,
                    payload: response.data.docs,
                })
            }
        },
            error => {
                console.log(" updateProduct error:", JSON.stringify(error));
            })
}


export const updateSellerAddress = (data) => dispatch => {

    console.log('Inside savepaymentDetailsToStore action', data);
    dispatch({
        type: UPDATE_SELLER_ADDRESS,
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

export const updateSellerNamePic = (sellerId, name, profileImage) => dispatch => {
    console.log("Images: ", JSON.stringify(profileImage));

    const formData = new FormData();

    formData.append('SellerID', sellerId);
    formData.append('Name', name);
    formData.append('Image', profileImage);
    
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        }
    }

    axios.post(`${ROOT_URL}/updatenamepic_seller`, formData, config)
        .then(response => {
            console.log(response);
            console.log("response updatenamepic_seller", response);
            dispatch({
                type: UPDAT_SELLER_NAMPIC,
                payload: {
                    Name: name,
                    ProfileURL: response.data.ProfileURL
                }
            });
        }, (err) => {
            console.log(err);
        });
} 