import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { getFilterCategories, getFilterName } from '../../../Redux/selectors/customer/selector';
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';  
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Navbar as BNavbar, Form, FormControl, Button, Nav, NavDropdown } from 'react-bootstrap';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logout } from "../../../Redux/actions/customer/loginAction";
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            redirect: false,
            prdouctData: {},
            name: "",
            anchorEl: true,
        }
        this.ChangeHandler = this.ChangeHandler.bind(this);
        this.clickHandler = this.clickHandler(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        });
    }

    clickHandler = () => () => {
       
        //     name : ""
        // })
    }
    ChangeHandler = e => {
        this.setState({
            name: e.target.value
        })
    }
    componentWillMount = () => {
        this.logout = this.logout.bind(this)
    }
    logout = () => {
        this.props.logout();
        this.setState({
            redirect: true
        })
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.cart !== this.props.cart) {
            this.setState({
                cart: this.props.cart
            })
        }
        // if (prevProps.productData !== this.props.productData) {
        //     this.setState({
        //         productData: this.props.productData
        //     })
        // }
    }
    handleKeyPress(e) {
        // 
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log("Enter key pressed!")
        }
    }

    render() {
        // let redirect = this.state.redirect;
        if (!localStorage.getItem("id") || !(localStorage.getItem("type") == "admin")) {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <div>
                <BNavbar style={{ backgroundColor: "#252f3d", padding: "0" }}>
                    <BNavbar.Brand style={{ marginLeft: "1%" }} href="/customer/product"><img src="/navbar_logo.jpeg" width="150" height="55" alt="amazon" /></BNavbar.Brand>
                    <Nav style={{ color: "white" }} className="mr-auto">
                        <Nav.Link style={{ color: "white" }} href="/admin/inventory">
                            Inventory
                        </Nav.Link>
                        <Nav.Link style={{ color: "white" }} href="/admin/sellers">
                            Seller
                        </Nav.Link>
                        <Nav.Link style={{ color: "white" }} href="/admin/orders">
                            Orders
                        </Nav.Link>
                        <Nav.Link style={{ color: "white" }} href="/admin/dashboard">
                            Dashboard
                        </Nav.Link>

                    </Nav>
                    <Nav style={{ color: "white" }}>
                        <NavDropdown
                            title={
                                <div>
                                    <Typography style={{ color: "white", fontSize: "12px" }} variant="body2" gutterBottom>
                                        Hello, {localStorage.getItem("name")}
                                        <br />
                                        <b>Account & List</b>
                                    </Typography>
                                </div>
                            }
                            id="nav-dropdown">
                            {/* <NavDropdown.Item eventKey="4.1" href="/customer/orders">Your Orders</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2" href="/customer/profile">Account</NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.4" onClick={this.logout}>Signout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </BNavbar>
            </div>
        )
    }
}











// class Navbar extends Component {
//     render() {
//         return (
//             <div>
//                 <nav class="navbar navbar-dark bg-dark  navbar-expand-lg ">
//                     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//                         <span class="navbar-toggler-icon"></span>
//                     </button>
//                     <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
//                         <Link class="navbar-brand" to="/">amazon</Link>
//                         <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
//                             <li class="nav-item">
//                                 <Link class="nav-link" to="/admin/inventory">Inventory </Link>
//                             </li>
//                             <li class="nav-item">
//                                 <Link class="nav-link" to="/admin/sellers">Sellers</Link>
//                             </li>
//                             <li class="nav-item">
//                                 <Link class="nav-link" to="/admin/orders">Orders</Link>
//                             </li>
//                             <li class="nav-item">
//                                 <Link class="nav-link" to="/admin/dashboard">Dashboard<span class="sr-only">(current)</span></Link>
//                             </li>
//                         </ul>

//                     </div>
//                 </nav>
//             </div>
//         )
//     }
// }

const map = state => {
    return {
    }
}
export default connect(map, {logout })(Navbar);



