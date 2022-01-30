import axios from 'axios';
import { GET_PAYMENT_DETAILS , ADD_PAYMENT_DETAILS} from "../../../Redux/constants/action-types";
const { backendURL } = require("../../../config");

export function getPaymentDetails(data){
    console.log("inside customer paymnent action");
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    const request = axios.post(backendURL + '/customer/payment/payment', data,config)       
        return (dispatch) => {
            request.then((res)=>{
                dispatch({
                    type: GET_PAYMENT_DETAILS,
                    payload : res.data
                });
                // callback(res)
            })
        }
}
export const addCard = card =>dispatch=> {

    card.id = localStorage.getItem("id")
    console.log("@@@@" , card )
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token,
        }
    }
    axios.post(backendURL + "/customer/addCard" , card, config).then(res => {
        console.log(res.data)
        dispatch({
            type : ADD_PAYMENT_DETAILS,
            payload : card
        })
    }) 
}

// return function (dispatch) {
          
//     axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
//     return axios.get(backendconfig+'/mongo/getStudentData?id='+ id+'&info=GET_STUDENT_PROFILE')
//       .then(res => {
//           dispatch(
//               getSuccess(res)
//           )
//           callback();
//       }).catch(error => {
//           dispatch(getError(error))
//       })
// }
