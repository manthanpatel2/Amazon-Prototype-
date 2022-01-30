import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import Navbar from "../navbar/navbar";
import { getPaymentDetails , addCard } from "../../../Redux/actions/customer/payment"
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap';
import { placeOrder  } from "../../../Redux/actions/customer/cartActions"

class Payment extends Component {
    //This is payment component
    constructor(props) {
        super(props)
        this.state = {
            payment: [],
            addresses: [],
            paymentMethod: {},
            savedAddress: {},
            product: [],
            finalPrice: "",
            modalShow: false,
            modalShowAddress: false,
            modalOrder : false
        }
        this.SelectCard = this.SelectCard.bind(this);
        this.SelectAdd = this.SelectAdd.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseOrder = this.handleCloseOrder.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleShowAdd = this.handleShowAdd.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.addAddress = this.addAddress.bind(this);
        this.addCard = this.addCard.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }
    placeOrder = () => {
        let data = {
            CustomerID: localStorage.getItem("id"),
            CardNumber: this.state.paymentMethod.Number,
            CardName: this.state.paymentMethod.NameOnCard,
            Address: this.state.savedAddress.Street + " , " + this.state.savedAddress.City + " , " + this.state.savedAddress.State + " , " + this.state.savedAddress.Country + " , " + this.state.savedAddress.Zipcode
        }
        this.props.placeOrder(data)
        this.setState({modalShowOrder : true})
    }
    handleCloseOrder = () => this.setState({modalShowOrder : false})
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addAddress = (e) => {
        e.preventDefault();
        let address = {
            Street: this.state.Street,
            City: this.state.City,
            State: this.state.State,
            Country: this.state.Country,
            Zipcode: this.state.Zipcode
        }
        this.setState({
            savedAddress: address
        }, () => {
            this.handleCloseAdd()
        })
    }
    addCard = (e) => {
        e.preventDefault();
        let card = {
            NameOnCard: this.state.NameOnCard,
            Number: this.state.Number
        }
        this.setState({
            paymentMethod: card
        }, () => {
            this.handleClose()
        })
        // action for add card
        this.props.addCard(card)
    }
    SelectAdd = i => {
        this.handleCloseAdd();
        this.setState({
            savedAddress: this.state.addresses[i]
        })
    }
    SelectCard = (i) => {
        this.handleClose();
        this.setState({
            paymentMethod: this.state.payment[i]
        })
    }
    componentDidMount() {
        console.log("inside payment componentWillMount")
        let data = {
            id: localStorage.getItem("id")
        }
        this.props.getPaymentDetails(data)

    }

    componentWillReceiveProps(prevProps) {
        console.log("CustomerPayment : COMPONENETWILLRECEIVEPROPS CALLED")
        if (prevProps.savedAddress !== this.props.savedAddress || prevProps.payment !== this.props.payment || prevProps.cart !== this.props.cart) {

            let finalPrice = null
            prevProps.cart.forEach(element => {
                console.log("elem", element)
                finalPrice += element.Price * element.Quantity
            });

            console.log("final", finalPrice)
            this.setState({
                addresses: prevProps.savedAddress,
                payment: prevProps.payment,
                savedAddress: prevProps.savedAddress[0],
                paymentMethod: prevProps.payment[0],
                product: prevProps.cart,
                finalPrice: finalPrice
            })
        }
    }


    handleClose = () => this.setState({ modalShow: false });
    handleShow = () => this.setState({ modalShow: true });
    handleCloseAdd = () => this.setState({ modalShowAddress: false });
    handleShowAdd = () => this.setState({ modalShowAddress: true });

    render() {
        console.log("Props:", this.props.savedAddress)
        let redirectVar = null
        if (!localStorage.getItem("id")) {
            redirectVar = <Redirect to="/customerLogin"></Redirect>
        }
        var today = new Date();
        today.setDate(today.getDate() + 7);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        let address = null;
        let cards = null;
        if (this.state.addresses.length > 0) {
            address = <div>{this.state.addresses.map((elem, i) => {
                return (
                    <div className="card" style={{ margin: "2%", padding: "2%" }}>
                        <span>
                            {elem.Street} {elem.City} <button type="button" className="btn btn-warning" style={{ float: "right" }} onClick={() => this.SelectAdd(i)}>Select Address</button> <br></br>
                            {elem.State}  {elem.Country}<br></br>
                            {elem.Zipcode}<br></br>
                        </span>
                    </div>
                )
            })}
                <div className="card card-body">
                    <form onSubmit={this.addAddress}>
                        <div className="form-group">
                            <input type="text" name="Street" placeholder="Enter Street" className="form-control" onChange={this.changeHandler} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="City" placeholder="Enter City" className="form-control" onChange={this.changeHandler} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="State" className="form-control" placeholder="Enter State" onChange={this.changeHandler} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="Country" placeholder="Enter Country" className="form-control" onChange={this.changeHandler} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="Zipcode" className="form-control" placeholder="Enter Zipcode" onChange={this.changeHandler} />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="form-control btn btn-warning" value="Add Address" />
                        </div>
                    </form>
                </div>
            </div>
        }
        if (this.state.payment.length > 0) {
            cards = <div>{this.state.payment.map((elem, i) => {
                return (
                    <div className="card" style={{ margin: "2%", padding: "2%" }}>

                        <span>
                            Name : {elem.NameOnCard} <button type="button" className="btn btn-warning" style={{ float: "right" }} onClick={() => this.SelectCard(i)}>Select Card</button> <br />
                            Card No. : {elem.Number}
                        </span>

                    </div>
                )
            })}
                <div className="card card-body">
                    <form onSubmit={this.addCard}>
                        <div className="form-group">
                            <input type="text" name="NameOnCard" placeholder="Enter Name On Card" className="form-control" onChange={this.changeHandler} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="Number" placeholder="Enter Card Number" className="form-control" onChange={this.changeHandler} />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="form-control btn btn-warning" value="Add Card" />
                        </div>
                    </form>
                </div>
            </div>
        }
        return (
            <div>
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Card</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {cards}
                    </Modal.Body>


                </Modal>
                <Modal show={this.state.modalShowAddress} onHide={this.handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Address</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {address}
                    </Modal.Body>


                </Modal>
                <Modal show={this.state.modalShowOrder} onHide={this.handleCloseOrder}>

                    <Modal.Body className="text-center">
                        <span className="text-success">Order Placed Succesfully !!!</span><br/>
                        You Paid <span className="text-danger">${Number.parseFloat(this.state.finalPrice).toFixed(2)}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={this.handleCloseOrder}>
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="container">
                    <div className="row" style={{ marginTop: "2%" }} >
                        <div className="col-md-3 card" style={{ padding: "1%" }} ><b>1. Shipping Address</b></div>
                        <div className="col-md-6 card" style={{ padding: "1%" }}>
                            <div style={{ float: "left" }}>
                                <button style={{ float: "right", width: "20%", height: "30%" }} className="btn btn-secondary" type="button" onClick={this.handleShowAdd}>Change</button>
                                {this.state.savedAddress.Street} {this.state.savedAddress.City}<br></br>
                                {this.state.savedAddress.State}  {this.state.savedAddress.Country}<br></br>
                                {this.state.savedAddress.Zipcode}<br></br>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-3 card" style={{ padding: "1%" }}><b>2. Payment Method</b></div>
                        <div className="col-md-6 card" style={{ padding: "1%" }}>
                            <div style={{ float: "left" }}>
                                <button style={{ float: "right", width: "20%", height: "30%" }} className="btn btn-secondary" type="button" onClick={this.handleShow}>Change</button>
                                <b>Visa</b> ending in : {this.state.paymentMethod.Number}<br></br>
                                <b>Billing Address : </b>{this.state.savedAddress.Street} {this.state.savedAddress.City} {this.state.savedAddress.State}<br></br>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-9 card" style={{ padding: "1%" }}><b>3. Review Item and Shipping</b><br></br>
                            <div className="card" style={{ padding: "1%" }}>
                                <h5 style={{ textDecoration: "green" }} className="text-success"> Guaranteed Delivery Date : {today}</h5>
                                <small>Items shipped from Amazon.com</small><br />
                                {this.state.product.map(elem => {
                                    return (
                                        <div>
                                            <div className="row" style={{ marginBottom: "10px" }}>
                                                <div className="col-md-2">
                                                    <img src={elem.ProductID.Images[0]} width="100px" height="100px" alt="Oops "></img>
                                                </div>
                                                <div className="col-md-7">
                                                    Shipped By : {elem.ProductID.Seller.Name}<br />
                                                    <b>{elem.ProductID.Name}</b><br />
                                                    {elem.ProductID.Description}<br />
                                                    Quantity : {elem.Quantity}<br />

                                                    <span className="text-danger">Bundle Total :  ${Number.parseFloat(elem.Price * elem.Quantity).toFixed(2)}</span>
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-9 card" style={{ padding: "2%" }}>
                            <div className="row">
                                <div className="col-md-3">
                                    <button className="btn btn-warning" onClick={this.placeOrder}>Place Your Order</button>
                                </div>
                                <div className="col-md-7">

                                    <b className="text-danger">Order Total : ${Number.parseFloat(this.state.finalPrice).toFixed(2)}</b><br />
                                    <small>By placing your order, you agree to Amazon.com's <span className="text-info">privacy notice</span> and <span className="text-info"> conditions of use</span></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        savedAddress: state.customerPayment.savedAddress,
        payment: state.customerPayment.payment,
        cart: state.customerPayment.cart
    }
}
export default connect(mapStateToProps, { getPaymentDetails, placeOrder, addCard })(Payment);