import React, { Component } from 'react';
import ProductDetailsDashboard  from "../products/productDetailsDashBoard";
import {connect} from 'react-redux';
import {getProduct} from '../../../Redux/actions/customer/cartActions'
class ProductDetails extends Component {
    constructor(props){
        super(props);
        this.state ={
            product : {}
        }       
    }
    componentWillMount(){
        this.props.getProduct(this.props.match.params.id)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.product !== this.props.product){
            this.setState({
                product : nextProps.product
            })
        }
    }
    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    render(){
        let details = null;
        if(!this.isEmpty(this.state.product))
            details = <ProductDetailsDashboard Product={this.state.product } /> 
            // details = JSON.stringify(this.state.product)
        
        return <div> 
            {details}
        </div>
    }
}
const map = state => {
    return {
        product : state.cart.product
    }
}
export default connect(map,{getProduct})(ProductDetails);