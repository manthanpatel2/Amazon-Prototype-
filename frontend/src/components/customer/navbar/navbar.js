import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { getCart } from "../../../Redux/actions/customer/cartActions";
import { getProducts } from "../../../Redux/actions/customer/productActions";
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
        this.props.getProducts(this.state.productData, 1, 8, this.state.name, this.props.filterCategoires)
        // this.setState({
        //     name : ""
        // })
    }
    ChangeHandler = e => {
        this.setState({
            name: e.target.value
        })
    }
    componentWillMount = () => {
        this.props.getCart({ id: localStorage.getItem("id") })
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
            this.props.getProducts(this.state.productData, 1, 8, this.state.name, this.props.filterCategoires)
        }
    }

    render() {
        // let redirect = this.state.redirect;
        if (!localStorage.getItem("id") || !(localStorage.getItem("type") == "customer")) {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <div>
                <BNavbar style={{ backgroundColor: "#252f3d", padding: "0" }}>
                    <BNavbar.Brand style={{ marginLeft: "1%" }} href="/customer/product"><img src="/navbar_logo.jpeg" width="150" height="55" alt="amazon" /></BNavbar.Brand>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" style={{ width: "800px", borderRadius: "0px" }} className="mr-sm-7" onChange={this.ChangeHandler} onKeyPress={this.handleKeyPress} value={this.state.name} />
                        <Button variant="warning" onClick={this.clickHandler} type="button" style={{ marginTop: "1.5%", height: "2.4em" }} ><SearchIcon style={{ paddingTop: "5%" }} /></Button>
                    </Form>
                    <Nav className="mr-auto"></Nav>
                    <Nav style={{ color: "white" }}>
                        <NavDropdown
                            title={
                                <div>
                                    <Typography style={{ color: "white", fontSize:"12px" }} variant="body2" gutterBottom>
                                        Hello, {localStorage.getItem("name")}
                                        <br/>
                                        <b>Account & List</b>
                                    </Typography>
                                </div>
                            }
                            id="nav-dropdown">
                            <NavDropdown.Item eventKey="4.1" href="/customer/orders">Your Orders</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2" href="/customer/profile">Account</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.4" onClick={this.logout}>Signout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Nav.Link href="/customer/cart">
                            <StyledBadge badgeContent={this.state.cart.length} color="secondary">
                                <ShoppingCartIcon style={{ color: "white" }} />
                            </StyledBadge>
                        </Nav.Link>
                        {/* <Nav.Link>
                            <PowerSettingsNewIcon style={{ color: "white" }} onClick={this.logout} />
                        </Nav.Link> */}
                    </Nav>
                </BNavbar>
                {/*                 
                <nav className="navbar navbar-dark bg-dark  navbar-expand-lg ">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/customer/product">amazon</Link>
                        
                        <form className="ml-3 my-auto d-inline-block w-75">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav align-right">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/customer/cart">

                                    <StyledBadge badgeContent={this.state.cart.length} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </Link>
                            </li>

                        </ul>
                    </div> 
                </nav>*/}
            </div>
        )
    }
}
const map = state => {
    return {
        cart: state.cart.cart,
        productData: state.customerProductData,
        filterCategoires: getFilterCategories(state.customerProductData),
        filterName: getFilterName(state.customerProductData),
    }
}
export default connect(map, { getCart, logout, getProducts })(Navbar);


