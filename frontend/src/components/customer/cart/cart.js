import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart, updateCart } from '../../../Redux/actions/customer/cartActions';
import DeleteIcon from '@material-ui/icons/Delete';
import { Row, Form, Col } from "react-bootstrap";

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            finalPrice: 0,
            cart: [],
            saveForLater: []
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.savetoLater = this.savetoLater.bind(this);
        this.updateQty = this.updateQty.bind(this);
        this.updateQtySave = this.updateQtySave.bind(this);
        this.deleteFromSave = this.deleteFromSave.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.updateGift = this.updateGift.bind(this);


    }


    componentWillMount() {
        this.props.getCart({ id: localStorage.getItem("id") })
    }
    componentDidMount() {
        this.setState({
            cart: this.props.cart,
            saveForLater: this.props.saveForLater
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            this.setState({
                cart: this.props.cart
            }, () => {
                let finalPrice = 0;
                for (let i of this.state.cart) {
                    finalPrice += i.Price * i.Quantity
                }
                this.setState({
                    finalPrice: finalPrice
                })

            })
        }
        if (prevProps.saveForLater !== this.props.saveForLater)
            this.setState({
                saveForLater: this.props.saveForLater
            })
    }
    changeHandler = (e, i) => {
        let id = "defaultCheck1" + i;
        if (document.getElementById(id).checked) {
            let update = this.state.cart.filter((val, k) => k === i)
            update[0].GiftMessage = e.target.value
            let newCart = this.state.cart
            newCart[i] = update[0];
            this.setState({
                cart: newCart
            }, () => {
                this.props.updateCart({ id: localStorage.getItem("id"), Cart: this.state.cart, SaveForLater: this.state.saveForLater })
            })
        }
    }
    deleteFromCart = i => {
        let del = this.state.cart.filter((val, k) => k !== i)
        this.setState({
            cart: del
        }, () => {
            this.props.updateCart({ id: localStorage.getItem("id"), Cart: this.state.cart, SaveForLater: this.state.saveForLater })
        })
    }
    deleteFromSave = i => {
        let del = this.state.saveForLater.filter((val, k) => k !== i)
        this.setState({
            saveForLater: del
        }, () => {
            this.props.updateCart({ id: localStorage.getItem("id"), Cart: this.state.cart, SaveForLater: this.state.saveForLater })
        })
    }
    updateQty = (e, i) => {
        let update = this.state.cart.filter((val, k) => k === i)
        update[0].Quantity = e.target.value
        let newCart = this.state.cart
        newCart[i] = update[0];
        this.setState({
            cart: newCart
        }, () => {
            this.props.updateCart({ id: localStorage.getItem("id"), Cart: this.state.cart, SaveForLater: this.state.saveForLater })
        })
    }
    updateGift = (e, i) => {
        // e.preventDefault()
        let id = "defaultCheck1" + i;
        let id2 = "GiftTextMessage" + i
        console.log("id1 ", id, " id2 ", id2)

        if (document.getElementById(id).checked) {
            // alert("inside update gift")
            document.getElementById(id).checked = true;
            document.getElementById(id2).style.display = "block"
            let update = this.state.cart.filter((val, k) => k === i)
            update[0].Price = update[0].Price * 1.02
            update[0].IsGift = true
            let newCart = this.state.cart
            newCart[i] = update[0];
            this.setState({
                cart: newCart
            }, () => {
                console.log('this cart', this.state.cart)
                this.props.updateCart({ id: localStorage.getItem("id"), Cart: this.state.cart, SaveForLater: this.state.saveForLater, })
            })
        }
        else {
            // alert("inside update else gift")
            document.getElementById(id).checked = false;
            document.getElementById(id2).style.display = "none"
            let update = this.state.cart.filter((val, k) => k === i)
            update[0].Price = update[0].Price * 0.98039
            update[0].IsGift = false
            let newCart = this.state.cart
            newCart[i] = update[0];
            this.setState({
                cart: newCart
            }, () => {
                this.props.updateCart({ id: localStorage.getItem("id"), Cart: this.state.cart, SaveForLater: this.state.saveForLater })
            })
        }

    }
    updateQtySave = (e, i) => {
        let update = this.state.saveForLater.filter((val, k) => k === i)
        update[0].Quantity = e.target.value
        let newSave = this.state.saveForLater
        newSave[i] = update[0];
        this.setState({
            saveForLater: newSave
        }, () => {
            this.props.updateCart({ id: localStorage.getItem("id"), Cart: this.state.cart, SaveForLater: this.state.saveForLater })
        })
    }
    addToCart = i => {
        // alert("ADD TO CART CALLED")
        let newSave = this.state.saveForLater.filter((val, k) => k !== i)
        let newCart = this.state.cart;
        let add = this.state.saveForLater.filter((val, k) => k === i)

        newCart.push(add[0])
        // alert(newCart.length)
        this.setState({
            cart: newCart,
            saveForLater: newSave
        }, () => {
            this.props.updateCart({ id: localStorage.getItem("id"), Cart: this.state.cart, SaveForLater: this.state.saveForLater })
            // alert(this.state.cart)
            let finalPrice = 0;
            for (let i of this.state.cart) {
                finalPrice += i.Price * i.Quantity
            }
            this.setState({
                finalPrice: finalPrice
            })


            console.log("CART" + this.state.cart)
            console.log("SAVE FOR LATER" + this.state.saveForLater)
        })
    }
    savetoLater = i => {
        // alert("SAVE FOR LATER CALLED")
        let newCart = this.state.cart.filter((val, k) => k !== i)
        let newSave = this.state.saveForLater;
        let add = this.state.cart.filter((val, k) => k === i)

        newSave.push(add[0])

        this.setState({
            cart: newCart,
            saveForLater: newSave
        }, () => {
            this.props.updateCart({ id: localStorage.getItem("id"), Cart: this.state.cart, SaveForLater: this.state.saveForLater })
            // alert(this.state.cart)
            let finalPrice = 0;
            for (let i of this.state.cart) {
                finalPrice += i.Price * i.Quantity
            }
            this.setState({
                finalPrice: finalPrice
            })


            console.log("CART" + this.state.cart.length)
            console.log("SAVE FOR LATER" + this.state.saveForLater.length)
        })
    }
    render() {
        let products = null;
        let saved = null;
        if (this.state.cart.length > 0)
            products = this.state.cart.map((elem, i) => {
                return (
                    <div className="card" style={{ marginBottom: "2%" }} key={i}>
                        <div className="row" style={{ padding: "2%" }}>
                            <div className="col-md-3">
                                <img src={elem.ProductID.Images[0]} width="90%" height="90%" alt="Oops "></img>
                            </div>
                            <div className="col-md-7">
                                <Link to={"/customer/productDetails/" + elem.ProductID._id}>{elem.ProductID.Name} </Link><br />
                                Shipped from : <Link to="/customer/home">{elem.ProductID.Seller.Name}</Link> <br />
                                Gift Option :
                                <form className="form-inline">
                                    <div className="form-check-inline" >
                                        <input className="form-check-input" onClick={(e) => this.updateGift(e, i)} type="checkbox" name="IsGift" id={"defaultCheck1" + i} defaultChecked={elem.IsGift} />
                                        <label style={{ display: "block" }} id="GiftMessage" className="form-check-label">
                                            Gift pack
                                     </label>
                                    </div>
                                    <div className="form-group mx-sm-3 mb-2">
                                        <label className="sr-only">Gift Message</label>
                                        <input
                                            style={{ display: "block" }}
                                            type="text"
                                            id={"GiftTextMessage" + i}
                                            className="form-control"
                                            onChange={(e) => this.changeHandler(e, i)}
                                            name="GiftMessage"
                                            placeholder="Gift message"
                                            defaultValue={elem.GiftMessage}
                                        />
                                    </div>
                                </form>

                                <form className="form-inline">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <label className="sr-only">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            onChange={(e) => this.updateQty(e, i)}
                                            name="ItemQuantity"
                                            placeholder="Qty"
                                            defaultValue={elem.Quantity}
                                        />
                                    </div>
                                </form>

                                <button className="btn btn-light" onClick={() => { this.savetoLater(i) }}>Save for later</button>

                            </div>

                            <div className="col-md-2">
                                <div style={{ float: "right", paddingRight: "15%" }}>
                                    <Row>
                                        <span className="text-danger">${Number.parseFloat(elem.Price).toFixed(2)}<br /></span>
                                    </Row>
                                    <Row>
                                        <button className="btn btn-light float-right" onClick={() => { this.deleteFromCart(i) }}><DeleteIcon color="secondary" /></button>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginRight: "2%" }}>
                            <div className="col-md-12 text-right">

                                Subtotal :
                                    <span className="text-danger">  ${Number.parseFloat(elem.Price * elem.Quantity).toFixed(2)}</span>
                                <br /><br />
                            </div>
                        </div>
                    </div>
                )
            })
        if (this.state.saveForLater.length > 0)
            saved = this.state.saveForLater.map((elem, i) => {
                return (
                    <div className="card" style={{ marginBottom: "2%" }} key={i}>
                        <div className="row" style={{ padding: "2%" }}>


                            <div className="col-md-3">
                                <img src={elem.ProductID.Images[0]} width="90%" height="90%" alt="Oops "></img>
                            </div>
                            <div className="col-md-7">
                                <Link to={"/customer/productDetails/" + elem.ProductID._id}>{elem.ProductID.Name} </Link><br />
                            Shipped from : <Link to="/customer/home">{elem.ProductID.Seller.Name}</Link> <br />
                            Gift Option :
                                <form className="form-inline">
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="IsGift" id="defaultCheck1" defaultChecked={elem.IsGift} />
                                        <label className="form-check-label" >
                                            Gift pack
                                     </label>
                                    </div>
                                </form>
                                {/* <Form.Row>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Label className="signup-form-lable"> Gift Message</Form.Label>
                                       <input
                                            type="text"
                                            className="form-control"
                                            onChange={this.changeHandler}
                                            name="ItemQuantity"
                                            placeholder="Gift message"
                                            defaultValue={elem.GiftMessage}
                                        /> 
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Label className="signup-form-lable"> Quantity</Form.Label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            onChange={(e) => this.updateQtySave(e, i)}
                                            name="ItemQuantity"
                                            placeholder="Qty"
                                            defaultValue={elem.Quantity}
                                        />
                                    </Form.Group>
                                </Form.Row> */}
                                {/* <div className="form-group mx-sm-3 mb-2">
                                        <label className="sr-only">Quantity</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={this.changeHandler}
                                            name="ItemQuantity"
                                            placeholder="Gift message"
                                            defaultValue={elem.GiftMessage}
                                        />
                                    </div> */}

                                <form className="form-inline">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <label className="sr-only">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            onChange={(e) => this.updateQtySave(e, i)}
                                            name="ItemQuantity"
                                            placeholder="Qty"
                                            defaultValue={elem.Quantity}
                                        />
                                    </div>
                                </form> 
                                <button className="btn btn-warning" onClick={() => this.addToCart(i)}>Add to Cart</button>

                            </div>
                            <div className="col-md-2">
                                <div style={{ float: "right", paddingRight: "15%" }}>
                                    <Row>
                                        <span className="text-danger">${Number.parseFloat(elem.Price).toFixed(2)}<br /></span>
                                    </Row>
                                    <Row>
                                        <button className="btn btn-light float-right" onClick={() => { this.deleteFromSave(i) }}><DeleteIcon color="secondary" /></button>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginRight: "2%" }}>
                            <div className="col-md-12 text-right">

                                Subtotal :
                                    <span className="text-danger">  ${Number.parseFloat(elem.Price * elem.Quantity).toFixed(2)}</span>
                                <br /><br />
                            </div>
                        </div>
                    </div>
                )
            })

        return (
            <div>
                {/* CART : {JSON.stringify(this.state.cart)}<br />
                SAVE FOR LATER : {JSON.stringify(this.state.saveForLater)}<br /> */}
                <div className="card float-right" style={{ padding: "2%", marginTop: "6%", marginRight: "2%" }}>
                    <h5>Subtotal Items ({this.state.cart.length}) : ${Number.parseFloat(this.state.finalPrice).toFixed(2)} </h5>
                    <Link className="btn btn-warning" to="/customer/payment" >Proceed To Checkout</Link>
                </div>
                <div className="container" style={{ marginTop: "3%" }}>
                    <div className="row">
                        <div className="col-md-12" style={{ padding: "1%" }}>
                            <h5>Shopping Cart({this.state.cart.length})</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {products}
                            {/* {JSON.stringify(this.state.cart)} */}
                        </div>
                    </div>

                    {this.state.finalPrice != 0.00 &&
                        <div>
                            <div className="row" style={{ marginTop: "1%", marginBottom: "1%" }}>
                                <div className="col-md-12 text-center">
                                    <h5>FINAL PRICE : ${Number.parseFloat(this.state.finalPrice).toFixed(2)}</h5>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "2%" }}>
                                <div className="col-md-12 text-center">
                                    <Link className="btn btn-warning" to="/customer/payment" >Proceed To Checkout</Link>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col-md-12" style={{ padding: "1%" }}>
                            <h5>Saved For Later({this.state.saveForLater.length})</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {saved}
                            {/* {JSON.stringify(this.state.saveForLater)} */}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
const map = state => {
    return {
        cart: state.cart.cart,
        saveForLater: state.cart.saveForLater
    }
}
export default connect(map, { getCart, updateCart })(Cart);