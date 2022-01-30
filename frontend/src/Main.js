import React, { Component } from "react";
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { Route } from 'react-router-dom';
import CustomerLogin from './components/customer/customerLogin/customerLogin';
import CustomerSignUp from './components/customer/customerSignUp/customerSignUp';
import CustomerProductDashBoard from './components/customer/products/productDashBoard';
import SellerProductDashBoard from './components/seller/products/productDashBoard';
import CustomerNavBar from './components/customer/navbar/navbar';
import SellerNavBar from './components/seller/navbar/navbar';
import AdminNavBar from './components/admin/navbar/navbar';
import Orders from './components/customer/orders/orders'
import ProductDetails from './components/customer/productDetails/productDetails';
import Cart from './components/customer/cart/cart';
import Payment from "./components/customer/payment/payment";
import SaveForLater from './components/customer/saveForLater/saveForLater';
import CustomerProfile from './components/customer/customerProfile/customerProfile';
import SellerProfile from './components/seller/sellerProfile/sellerProfile';
import Dashboard from './components/admin/adminDashboard/dashboard';
import SellerOrder from './components/seller/orders/orders'
import AnalyticsDashboard from './components/admin/adminDashboard/dashboard';
import AdminInventory from './components/admin/adminInventory/inventory';
import AdminOrders from './components/admin/adminOrder/orders';
import AdminSellers from './components/admin/adminSellers/sellers'

class Main extends Component {


    render() {
        return (

            <BrowserRouter>
                <div>


                    <Route path="/admin"><AdminNavBar></AdminNavBar></Route>
                    <Route path="/admin/dashboard"><AnalyticsDashboard /></Route>
                    <Route path="/admin/inventory"><AdminInventory /></Route>
                    <Route path="/admin/orders"><AdminOrders /></Route>
                    <Route path="/admin/sellers"><AdminSellers /></Route>

                    <Route path="/login"> <CustomerLogin /> </Route>
                    <Route exact path="/"> <CustomerLogin /> </Route>
                    <Route path="/signUp"><CustomerSignUp /></Route>

                    <Route path="/seller"><SellerNavBar></SellerNavBar></Route>
                    <Route path="/seller/product"><SellerProductDashBoard /></Route>

                    <Route path="/customer"><CustomerNavBar></CustomerNavBar></Route>
                    <Route path="/customer/product"><CustomerProductDashBoard /></Route>
                    <Route path="/customer/cart"><Cart /></Route>
                    <Route path="/customer/payment"><Payment /></Route>
                    <Route path="/customer/saveForLater"><SaveForLater /></Route>
                    <Route path="/customer/orders"><Orders /></Route>
                    <Route path="/customer/productDetails/:id" component={ProductDetails} />


                    <Route path="/customer/Profile"><CustomerProfile /></Route>
                    <Route path="/seller/Profile"><SellerProfile /></Route>
                </div>
            </BrowserRouter>
        )
    }







    // render() {
    //     return (
    //         <BrowserRouter>
    //             <div>
    //                 {/* <Route path="/customerLogin"> <CustomerLogin /> </Route> */}
    //                 {/* <Route path="/adminLogin"><AdminLogin /></Route> */}
    //                 {/* <Route path="/customerSignUp"><CustomerSignUp /></Route> */}
    //                 {/* <Route path="/sellerSignUp"><SellerSignUp /></Route>
    //                 <Route path="/adminSignUp"><AdminSignUp /></Route> */}

    //                 <Route path="/seller/product"><SellerProductDashBoard /></Route>
    //                 <Route path="/customer/product"><CustomerProductDashBoard /></Route>
    //                 {/* <Route path="/customer/home"><CustomerHome /></Route> */}
    //                 <Route path="/customer/cart"><Cart /></Route>
    //                 <Route path="/customer/payment"><Payment /></Route>
    //                 <Route path="/customer/saveForLater"><SaveForLater /></Route>

    //                 <Route path="/customer/Profile"><CustomerProfile /></Route>
    //                 <Route path="/seller/Profile"><SellerProfile /></Route>

    //                 <Route path="/admin/dashboard"><AnalyticsDashboard /></Route>
    //                 <Route path="/admin/inventory"><AdminInventory /></Route>
    //                 <Route path="/admin/orders"><AdminOrders /></Route>
    //                 <Route path="/admin/sellers"><AdminSellers /></Route>
    //                 <Route path="/login"> <CustomerLogin /> </Route>

    //                 <Route path="/signUp"><CustomerSignUp /></Route>

    //                 <Route path="/seller"><SellerNavBar></SellerNavBar></Route>
    //                 <Route path="/seller/product"><SellerProductDashBoard /></Route>

    //                 <Route path="/customer"><CustomerNavBar></CustomerNavBar></Route>
    //                 <Route path="/customer/product"><CustomerProductDashBoard /></Route>
    //                 <Route path="/customer/cart"><Cart /></Route>
    //                 <Route path="/customer/payment"><Payment /></Route>
    //                 <Route path="/customer/saveForLater"><SaveForLater /></Route>
    //                 <Route path="/customer/orders"><Orders /></Route>
    //                 <Route path="/customer/productDetails/:id" component={ProductDetails} />
    //                 <Route path="/admin"><AdminNavBar></AdminNavBar></Route>

    //                 <Route path="/customer/Profile"><CustomerProfile /></Route>
    //                 <Route path="/seller/Profile"><SellerProfile /></Route>
    //                 <Route path="/seller/orders"><SellerOrder /></Route>
    //                 <Route path="/admin/Dashboard"><Dashboard /></Route>
    //             </div>
    //         </BrowserRouter>
    //     )
    // }
}
export default Main;
