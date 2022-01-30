import React, { Component } from "react";
import { connect } from 'react-redux';
import { getOrders , cancelOrder} from '../../../Redux/actions/customer/cartActions';
import Stepper from 'react-stepper-horizontal';
import {Link} from 'react-router-dom';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OpenOrders : [],
            CancelledOrders : [],
            DeliveredOrders : []
        };
        this.getStatus = this.getStatus.bind(this)
    }
    cancelOrder = (Order_id) => {
        this.props.cancelOrder({OrderID : Order_id})
    }
    getStatus = (status) => {
        if (status === "Accepted")
            return 0;
        else if (status === "Dispatched")
            return 1;
        else if (status === "Out for Delivery")
            return 2;
        else if (status === "Delivered")
            return 3;
    }
    componentDidMount() {
        this.props.getOrders({ CustomerID : localStorage.getItem("id") });
    }
    componentDidUpdate(prevProps){
        if(prevProps.OpenOrders !== this.props.OpenOrders){
            this.setState({
                OpenOrders : this.props.OpenOrders
            })
        }
        if(prevProps.CancelledOrders !== this.props.CancelledOrders){
            this.setState({
                CancelledOrders :this.props.CancelledOrders
            })
        }
        if(prevProps.DeliveredOrders !== this.props.DeliveredOrders){
            this.setState({
                DeliveredOrders : this.props.DeliveredOrders
            })
        }

    }
    
    render() {
        let orders = null;
        let cancel = null;
        let deliver = null;
        if (this.state.OpenOrders.length === 0) {
            orders = "No Orders Placed";
        } else {
            orders = this.state.OpenOrders.map((elem, i) => {
                return <div key={i} className="card card-body">
                    <div>
                        <h5><u>Order# : {elem.Order_id}</u></h5> <div style={{float : "right" , color : "red"}}>${Number.parseFloat(elem.Price * elem.Qty).toFixed(2)}</div>
                        <Link to={"/customer/productDetails/" + elem.ProductID} ><h6>{elem.ProductName}</h6></Link>
                        <h6>shipped from :: {elem.SellerName}</h6>
                        
                        <h6>Status : {elem.Tracking_Status}</h6>
                        <h6>Order Date : {elem.OrderDate}</h6><hr/>
                        <Stepper steps={ [{title: 'Accepted'}, {title: 'Dispatched'}, {title: 'Out for Delivery'}, {title: 'Delivered'}] } activeStep={ this.getStatus(elem.Tracking_Status) } />
                        <br/><br/>
                        <button className="btn btn-secondary float-right" style={{marginRight : "5%"}} type="button" data-toggle="collapse" data-target={"#collapseExample" + i} aria-expanded="false" aria-controls={"collapseExample" + i}>
                            View Details
                        </button>
                        <button className="btn btn-danger float-right" style={{marginRight : "5%"}} type="button" onClick={()=>this.cancelOrder(elem.Order_id)}>
                            Cancel Order
                        </button>
                    </div>
                    <div className="collapse" id={"collapseExample" + i} style={{marginTop : "5%"}}>
                        <div className="card card-body">
                            Billing Details : {elem.CardName} <br/>
                            Payment Details : {elem.CardNumber}   <br/>
                            Address : {elem.Address}
                        </div>
                    </div>
                </div>
            })
        }
        
        if (this.state.CancelledOrders.length === 0) {
            cancel = "No Orders Placed";
        } else {
            cancel = this.state.CancelledOrders.map((elem, i) => {
                return <div key={i} className="card card-body">
                    <div>
                        <h5><u>Order# : {elem.Order_id}</u></h5> <div style={{float : "right" , color : "red"}}>${Number.parseFloat(elem.Price * elem.Qty).toFixed(2)}</div>
                        <Link to={"/customer/productDetails/" + elem.ProductID} ><h6>{elem.ProductName}</h6></Link>
                        <h6>shipped from :: {elem.SellerName}</h6>
                        
                        <h6>Status : {elem.Tracking_Status}</h6>
                        <h6>Order Date : {elem.OrderDate}</h6><hr/>
                       
                        <button className="btn btn-secondary float-right" style={{marginRight : "5%"}} type="button" data-toggle="collapse" data-target={"#collapseExample1" + i} aria-expanded="false" aria-controls={"collapseExample1" + i}>
                            View Details
                        </button>
                       
                    </div>
                    <div className="collapse" id={"collapseExample1" + i} style={{marginTop : "5%"}}>
                        <div className="card card-body">
                            Billing Details : {elem.CardName} <br/>
                            Payment Details : {elem.CardNumber}   <br/>
                            Address : {elem.Address}
                        </div>
                    </div>
                </div>
            })
        }

        if (this.state.DeliveredOrders.length === 0) {
            deliver = "No Orders Delivered";
        } else {
            deliver = this.state.DeliveredOrders.map((elem, i) => {
                return <div key={i} className="card card-body">
                    <div>
                        <h5><u>Order# : {elem.Order_id}</u></h5> <div style={{float : "right" , color : "red"}}>${Number.parseFloat(elem.Price * elem.Qty).toFixed(2)}</div>
                        <Link to={"/customer/productDetails/" + elem.ProductID} ><h6>{elem.ProductName}</h6></Link>
                        <h6>shipped from :: {elem.SellerName}</h6>
                        
                        <h6>Status : {elem.Tracking_Status}</h6>
                        <h6>Order Date : {elem.OrderDate}</h6><hr/>
                        <Stepper steps={ [{title: 'Accepted'}, {title: 'Dispatched'}, {title: 'Out for Delivery'}, {title: 'Delivered'}] } activeStep={ this.getStatus(elem.Tracking_Status) } />
                        <br/><br/>
                        <button className="btn btn-secondary float-right" style={{marginRight : "5%"}} type="button" data-toggle="collapse" data-target={"#collapseExample2" + i} aria-expanded="false" aria-controls={"collapseExample2" + i}>
                            View Details
                        </button>
                        <button className="btn btn-danger float-right" style={{marginRight : "5%"}} type="button" onClick={()=>this.cancelOrder(elem.Order_id)}>
                            Cancel Order
                        </button>
                    </div>
                    <div className="collapse" id={"collapseExample2" + i} style={{marginTop : "5%"}}>
                        <div className="card card-body">
                            Billing Details : {elem.CardName} <br/>
                            Payment Details : {elem.CardNumber}   <br/>
                            Address : {elem.Address}
                        </div>
                    </div>
                </div>
            })
        }
        return <div className="container" style={{ marginTop: "2%" }}>
            <h4>Orders Placed ({this.state.OpenOrders.length})</h4>
            <hr/>
            {orders}
            <br/><br/>
            <h4>Delivered Orders ({this.state.DeliveredOrders.length})</h4>
            <hr/>
            {deliver}
            <br/><br/>
            <h4>Cancelled Orders ({this.state.CancelledOrders.length})</h4>
            <hr/>
            {cancel}
        </div>
    }

}
const map = state => {
    return {
        OpenOrders : state.cart.OpenOrders,
        DeliveredOrders : state.cart.DeliveredOrders,
        CancelledOrders : state.cart.CancelledOrders
    }
}
export default connect(map, { getOrders, cancelOrder })(Orders);