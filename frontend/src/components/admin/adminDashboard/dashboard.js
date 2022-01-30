import React, { Component } from 'react';
import './dashboard.css';
import Navbar from '../navbar/navbar';
import CustomerPurchaseGraph from './customerPurchaseGraph'
import OrderGraph from './orderGraph'
import ProductGraph from './productgraph';
import ProductRatingGraph from './productRatingGraph';
import ProductViewsGraph from './productViewsGraph';
import SellerSalesGraph from './sellerSalesGraph';
import { Link, Redirect } from 'react-router-dom';
//import { Nav, Navbar } from 'react-bootstrap';

class AnalyticsDashboard extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let redirectVar = null;
        if (localStorage.getItem("type") !== "admin") {
            redirectVar = <Redirect to="/login" />
        }

        return (
            <div>

                <div className >
                    <div className="margin">
                        <div className="text-center" >

                            <h3 style={{ fontWeight: "700", margin: "0.5em" }}>Analytics Dashboard</h3>
                            <div className='row' style={{ display: "flex", flexDirection: "row" }} >

                                <div className="row mt-1">
                                    <div className="card card-custom mx-1 mb-1" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                                        <div className="card-body" >
                                            <CustomerPurchaseGraph />
                                        </div>
                                    </div>

                                    <div className="card card-custom mx-1 mb-1" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                                        <div className="card-body" >
                                            <OrderGraph />
                                        </div>
                                    </div>

                                    <div className="card card-custom mx-1 mb-1" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                                        <div className="card-body" >
                                            <ProductGraph />
                                        </div>
                                    </div>

                                    <div className="card card-custom mx-1 mb-1" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                                        <div className="card-body" >
                                            <ProductRatingGraph />
                                        </div>
                                    </div>

                                    <div className="card card-custom mx-1 mb-1" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                                        <div className="card-body" >
                                            <ProductViewsGraph />
                                        </div>
                                    </div>

                                    <div className="card card-custom mx-1 mb-1" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                                        <div className="card-body" >
                                            <SellerSalesGraph />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default AnalyticsDashboard;
