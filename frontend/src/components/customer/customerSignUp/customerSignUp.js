import React, { Component } from "react";
import logo from "../../../images/amazon.png"
import { connect } from "react-redux";
import { customerSignUp } from "../../../Redux/actions/customer/loginAction";
import { Redirect } from "react-router-dom";

class CustomerSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.Login = this.Login.bind(this);
    }
    Login = (e) => {
        e.preventDefault();
        let data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: document.getElementById("role").value
        }
        this.props.customerSignUp(data);
    }
    render() {
        let alertElement = null, redirectVar = null;
        let role = localStorage.getItem("type");
        if (role === "customer") redirectVar = <Redirect to="/customer/product" />
        else if (role === 'seller') redirectVar = <Redirect to="/seller/product" />
        else if (role === 'admin') redirectVar = <Redirect to="/admin/dashboard" />

        if (this.props.signInSuccess === false)
            alertElement = <p className="alert alert-danger" role="alert">{this.props.message}</p>
        return (
            <div className="container">
                {redirectVar}
                <div className="row">
                    <div className="col-md-12" style={{ marginTop: "10%" }} >

                        <form style={{ marginLeft: "30%", marginRight: "30%" }} onSubmit={this.Login}>
                            <div className="text-center" >
                                <img src={logo} alt="oops" style={{ width: "50%" }} />
                            </div>
                            <h2>Sign Up</h2>

                            <div class="form-group">
                                <label for="name">Enter Name</label>
                                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name" />

                            </div>

                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />

                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Password" />
                            </div>
                            <label for="role">Choose Your Role: </label>
                            <select class="custom-select" id='role'>
                                <option value="Customer" >Customer</option>
                                <option value="Seller">Seller</option>
                                <option value="Admin">Admin</option>
                            </select>

                            <div class="form-group" style={{ width: "100%", marginTop: "20px" }}>
                                <button type="submit" class="btn btn-warning text-light" style={{ width: "100%" }}>Submit</button>
                            </div>
                            <small id="emailHelp" class="form-text text-muted">By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</small>
                            {alertElement}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        signInSuccess: state.customerLogin.signInSuccess,
        message: state.customerLogin.message
    }
}
export default connect(mapStateToProps, { customerSignUp })(CustomerSignUp);
