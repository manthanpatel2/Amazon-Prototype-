import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../sellerProfile/sellerProfile.css';
import Navbar from "../../seller/navbar/navbar";
import NamePic from "../sellerProfile/namePicCard";
import { connect } from "react-redux";
import Address from "../sellerProfile/addressCard";
import {fetchSellerProfile} from '../../../Redux/actions/seller/sellerProfileActions';

class SellerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    //  this.changePic= this.changePic.bind(this);
    // this.changeName= this.changeName.bind(this);
    }

    componentWillMount = () => {
        this.props.fetchSellerProfile(localStorage.getItem("id"));
    }
  
    render() {
        let alertElement = null, redirectVar = null;
        // if (localStorage.getItem("customerID"))
        //     redirectVar = <Redirect to="/customerHome" />
        if (this.props.signInSuccess === false)
            alertElement = <p className="alert alert-danger" role="alert">{this.props.message}</p>
        return (
            <div>
            <div className="container">
           
                {redirectVar}
                <div className="spacing"></div>
                <NamePic/>
              
                <table>
                    <tbody>
                    <div className="spacing"></div>
                        <tr>
                            <td>
                            <div style={{ width: "550px" }} >
                              
                                </div>
                                    <div className="spacing"></div>
                            </td>
                            <div className="spacing1"></div>
                            <td>
                            <div style={{ width: "550px" }} >
                               
                                </div>
                                    <div className="spacing"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
               
                <Address/>
                <div className="spacing"></div>
             
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
    sellerProfileData: state.sellerProfile
});

export default connect(mapStateToProps, {fetchSellerProfile})(SellerProfile);
