import React, { Component } from "react";
import logo from "../../../images/amazon.png"
import { sellerLogin } from "../../../Redux/actions/seller/loginAction";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
class Sellerlogin extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.Login = this.Login.bind(this);
    }
    Login = (e) => {
        e.preventDefault();
        let data = {
            email: document.getElementById("exampleInputEmail1").value,
            password: document.getElementById("exampleInputPassword1").value
        }
        this.props.sellerLogin(data);
    }
    render() {
        let alertElement = null, redirectVar = null;
        if (localStorage.getItem("id"))
            redirectVar = <Redirect to="/seller/product" />
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
                            <h2>Sign In</h2>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input 
                                    type="email" 
                                    class="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email" 
                                    onChange = {this.onChangeHandler}/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input 
                                    type="password" 
                                    class="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Password" 
                                    onChange = {this.onChangeHandler}/>
                            </div>
                            <div class="form-group" style={{ width: "100%" }}>
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
        signInSuccess: state.sellerLogin.signInSuccess,
        message: state.sellerLogin.message
    }
}
export default connect(mapStateToProps, { sellerLogin })(Sellerlogin);
