import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../customerProfile/customerProfile.css';
import { connect } from "react-redux";
import Navbar from "../../customer/navbar/navbar";
import NamePic from "../customerProfile/namePicCard";
import Address from "../customerProfile/addressCard";
import Votecount from "../customerProfile/voteCountCard";
import Comments from "../customerProfile/commentCard";
import PaymentCard from "../customerProfile/paymentCard";
import { fetchCustomerProfile } from '../../../Redux/actions/customer/customerProfileActions';


class CustomerProfile extends Component {
    constructor(props) {
        super(props);
        /*
         this.state = {
  
          }
          */
        //  this.changePic= this.changePic.bind(this);
        // this.changeName= this.changeName.bind(this);
    }
    /*
     Login = (e) => {
         e.preventDefault();function mapStateToProps(state) {
             return {
                 signInSuccess: state.sellerLogin.signInSuccess,
                 message: state.sellerLogin.message
             }
         } <img src={logo} alt="oops" style={{ width: "50%" }} />
         export default connect(mapStateToProps, { sellerLogin })(Sellerlogin);
         let data = {
             email: document.getElementById("exampleInputEmail1").value,
             password: document.getElementById("exampleInputPassword1").value
         }
         this.props.sellerLogin(data);
       
     }
     */
    componentWillMount() {
        // if(!this.props.ProfileData){
        this.props.fetchCustomerProfile(localStorage.getItem("id"));
        // }
    }


    render() {
        let alertElement = null, redirectVar = null;
        // if (localStorage.getItem("customerID"))
        //     redirectVar = <Redirect to="/customerHome" />
        //    if (this.props.signInSuccess === false)
        //      alertElement = <p className="alert alert-danger" role="alert">{this.props.message}</p>
        return (
            <div>
                <div className="container">

                    {redirectVar}
                    <div className="spacing"></div>
                    <NamePic />

                    <table>
                        <tbody>
                            <div className="spacing"></div>
                            <tr>


                                <td>
                                    <div className="comments" >
                                        <Comments />
                                    </div>
                                    <div className="spacing"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div>Address</div> */}
                    <Address />
                    <div className="spacing"></div>
                    {/* <div>Payments</div> */}
                    <PaymentCard />
                    <div className="spacing"></div>
                    <div className="row">
                        <div className="col-md-12" style={{ marginTop: "10%" }} >

                            <form style={{ marginLeft: "30%", marginRight: "30%" }} onSubmit={this.Login}>
                                <div className="text-center" >

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ProfileData: state.customerProfile
});

export default connect(mapStateToProps, { fetchCustomerProfile })(CustomerProfile);