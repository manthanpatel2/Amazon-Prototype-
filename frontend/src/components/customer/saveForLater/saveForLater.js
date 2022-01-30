import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import { Link } from 'react-router-dom';
class SaveForLater extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            finalPrice: 0
        }
        this.changeHandler = this.changeHandler.bind(this);
    }
    // FOR TESTING ONLY
    componentDidMount() {

        // CALL ACTION HERE 

        let products = [
            {
                img: "http://lorempixel.com/640/480/city",
                productName: "PRODUCT NAME",
                productDescription: "PRODUCT DESCRIPTION",
                productPrice: 10.10,
                productQty: 3,
                sellerName: "SELLER NAME"
            },
            {
                img: "http://lorempixel.com/640/480/city",
                productName: "PRODUCT NAME",
                productDescription: "PRODUCT DESCRIPTION",
                productPrice: 12.00,
                productQty: 5,
                sellerName: "SELLER NAME"
            }
        ]
        let finalPrice = 0;
        for (let i of products) {
            finalPrice += i.productPrice * i.productQty
        }
        this.setState({
            products: products,
            finalPrice: finalPrice
        })

    }

    changeHandler = e => {

    }
    render() {
        let products = null;
        if (this.state.products.length > 0)
            products = this.state.products.map(elem => {
                return (
                    <div className="card" style={{marginBottom:"2%"}}>
                        <div className="row" style={{ padding: "2%" }}>


                            <div className="col-md-2">
                                <img src={elem.img} width="150px" height="150px" alt="Oops "></img>
                            </div>
                            <div className="col-md-9">
                                <Link to="/customer/home">{elem.productName} </Link><br />
                            Shipped from : <Link to="/customer/home">{elem.sellerName}</Link> <br />
                            Gift Option :
                                <form class="form-inline">
                                    <div class="form-check-inline" style={{ marginLeft: "5%" }}>
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                        <label class="form-check-label" for="defaultCheck1">
                                            Gift pack
                                     </label>
                                    </div>
                                    <div class="form-group mx-sm-3 mb-2">
                                        <label for="qty" class="sr-only">Quantity</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={this.changeHandler}
                                            name="ItemQuantity"
                                            placeholder="Gift message"
                                        />
                                    </div>
                                </form>
                                
                                <form class="form-inline">
                                    <div class="form-group mx-sm-3 mb-2">
                                        <label for="qty" class="sr-only">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            onChange={this.changeHandler}
                                            name="ItemQuantity"
                                            placeholder="Qty"
                                        />
                                    </div>
                                </form>
                                <button className="btn btn-light">Add to Cart</button>
                            </div>
                            <div className="col-md-1">
                                <span className="text-danger">${Number.parseFloat(elem.productPrice).toFixed(2)}<br /></span>
                            </div>
                        </div>
                        <div className="row" style={{marginRight:"2%"}}>
                            <div className="col-md-12 text-right">
                                    
                                    Subtotal : 
                                    <span className="text-danger">  ${Number.parseFloat(elem.productPrice * elem.productQty).toFixed(2)}</span>
                                    <br/><br/>
                            </div>
                        </div>
                    </div>


                )
            })

        return (
            <div>
                <Navbar />
                <div className="container" style={{ marginTop: "3%" }}>
                    <div className="row">
                        <div className="col-md-12" style={{padding:"1%"}}>
                            <h5>Shopping Cart</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {products}
                        </div>
                    </div>
                    {/* <div className="row" style={{ marginTop: "1%", marginBottom: "1%" }}>
                        <div className="col-md-12 text-center">
                            <h5>FINAL PRICE : {this.state.finalPrice}</h5>
                        </div>
                    </div> */}
                    {/* <div className="row" style={{ marginBottom: "2%"}}>
                        <div className="col-md-12 text-center">
                            <button className="btn btn-warning">Proceed To Checkout</button>
                        </div>
                    </div> */}
                </div>
            </div >
        )
    }
}
export default SaveForLater;