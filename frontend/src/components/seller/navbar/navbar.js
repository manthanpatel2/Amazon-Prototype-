import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Redirect} from 'react-router';
import { Navbar as BNavbar, Form, FormControl, Button, Nav, NavDropdown } from 'react-bootstrap';
import { getFilterCategories, getFilterName } from '../../../Redux/selectors/customer/selector';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logout } from "../../../Redux/actions/customer/loginAction";
import SearchIcon from '@material-ui/icons/Search';
import { getProducts } from '../../../Redux/actions/seller/productAction';
import Typography from '@material-ui/core/Typography';


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect : false,
            name: ""
        }
        this.ChangeHandler = this.ChangeHandler.bind(this);
        this.clickHandler = this.clickHandler(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    clickHandler = () => () => {        
        this.props.getProducts(this.state.productData,localStorage.getItem("id"),1,8,this.state.name,this.props.filterCategoires)
        // this.setState({
        //     name : ""
        // })
    }

    ChangeHandler = e => {
        this.setState({
            name : e.target.value
        })
    }

    handleKeyPress(e) {
        // 
        if (e.key === 'Enter') {   
            e.preventDefault();
            // console.log("Enter key pressed!")      
            this.props.getProducts(this.state.productData,localStorage.getItem("id"),1,8,this.state.name, this.props.filterCategoires)
        }
      }
    componentWillMount = () => {
        this.logout =  this.logout.bind(this)
    }
    logout = () => {
        this.props.logout();
        this.setState({
            redirect : true
        })
    }

    render() {
        if(!localStorage.getItem("id") || !(localStorage.getItem("type") == "seller")){
            return(
            <Redirect to="/login" />
            );
        }
        return (
            <div>
                <BNavbar style={{ backgroundColor: "#252f3d", padding: "0" }}>
                    <BNavbar.Brand style={{ marginLeft: "1%" }} href="/seller/product"><img src="/navbar_logo.jpeg" width="150" height="55" alt="amazon" /></BNavbar.Brand>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" style={{ width: "800px" , borderRadius : "0px" }} className="mr-sm-7" onChange = { this.ChangeHandler } onKeyPress={this.handleKeyPress} value = {this.state.name}  />
                        <Button variant="warning" onClick = {this.clickHandler} type="button"  style={{marginTop : "1.5%" , height : "2.4em"}} ><SearchIcon style={{paddingTop : "5%" }}/></Button>
                    </Form>
                    <Nav className="mr-auto"></Nav>
                    <Nav style={{ color: "white" }}>
                        <NavDropdown
                            title={
                                <div style={{width:"150px", height:"40px", padding:"5px", margin:"5px"}}>
                                    <Typography style={{ color: "white", fontSize:"12px", width:"100%", height:"100%" }} variant="body2" gutterBottom>
                                        Hello, {localStorage.getItem("name")}
                                        <br/>
                                        <b>Account & List</b>
                                    </Typography>
                                </div>
                            }
                            id="nav-dropdown">
                            <NavDropdown.Item eventKey="4.1" href="/seller/orders">Your Orders</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2" href="/seller/profile">Account</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.4" onClick={this.logout}>Signout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </BNavbar>
            </div>
        )
    }
}
const map = state => {
    return {
        filterCategoires: getFilterCategories(state.sellerProductData),
        filterName: getFilterName(state.sellerProductData),
    }
}
export default connect(map, {logout, getProducts })(Navbar);


