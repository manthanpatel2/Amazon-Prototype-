import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert, Container } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Pagination from '@material-ui/lab/Pagination';
import Navbar from '../navbar/navbar';
import ProductTile from './productTile';
import ProductDetailsDashBoard from './productDetailsDashBoard';
import Typography from '@material-ui/core/Typography';
import { getFilterCategories, getFilterName, getFilterSort } from '../../../Redux/selectors/customer/selector';
import { getProducts } from '../../../Redux/actions/customer/productActions';
import {fetchAllCategories} from './../../../Redux/actions/admin/categoriesActions';

const Styles = styled.div`
    .product-filter-bar{
        height: 35px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .product-sidebar{
        padding: 10px;
        padding-left: 15px;
        height: 625px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
    }
    .product-dashboard{
        padding:10px;
        padding-left: 0px;
    }
    .product-dashboard-pagination{
        margin: 5px; 
        height:20px;
        width:500px;
    }
`;

class ProductDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activePage: 1,
            totalPages: 1,
            limit: 8,
            totalDocs: null,
            ProductDetailsView: false,
            SelectedProduct: null,
            cetagoriesSet: ["",],
            SelectedCetagories: [],
            filterCategoires: [],
        }
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }

    handleChange = (e, value) => {
        e.preventDefault();
        this.props.getProducts(this.props.productData, value, this.state.limit);
    };

    handlePageNext = (e) => {
        e.preventDefault();
        this.props.getProducts(this.props.productData, this.state.nextPage, this.state.limit,
            this.props.filterName, this.props.filterCategoires, this.filterSort);
    }

    onProductCardListner = (id) => {
        console.log("Product id: ", id);
        this.setState({
            SelectedProduct: this.state.products[id],
            ProductDetailsView: true,
        });
    };

    onBackClickListner = () => {
        this.setState({
            SelectedProduct: null,
            ProductDetailsView: false,
        });
    }

    handleCheckBoxChange = (e) => {
        // e.preventDefault();
        const category = e.target.name;
        const isChecked = e.target.checked;
        if (isChecked) {
            var isFound = false;
            for (var i = 0; i < this.state.filterCategoires.length; i++) {
                if (category == this.state.filterCategoires[i]) {
                    isFound = true;
                    break;
                }
            }
            if (!isFound) {
                var arr = this.state.filterCategoires;
                arr.push(category);
                this.setState({
                    filterCategoires: arr,
                });
                // this.state.filterCategoires.push(category);
            }
        } else {
            var isFound = false;
            var id = 0;
            for (var i = 0; i < this.state.filterCategoires.length; i++) {
                if (category == this.state.filterCategoires[i]) {
                    isFound = true;
                    id = i;
                    break;
                }
            }
            if (isFound) {
                var arr = this.state.filterCategoires;
                arr.splice(id, 1);
                this.setState({
                    filterCategoires: arr,
                });
            }

        }
        this.props.getProducts(this.props.productData, 1, this.state.limit,
             this.props.filterName, this.state.filterCategoires, this.props.filterSort);
        // console.log("filterCategoires: ",JSON.stringify(this.state.filterCategoires));
    }

    isCategoryInFilter = (category) => {
        for (var i = 0; i < this.state.filterCategoires.length; i++) {
            if (category == this.state.filterCategoires[i]) {
                return true;
            }
        }
        return false
    }

    onSortinOptionsChangeListner = (e) => {
        // console.log("value: ",e.target.value);
        this.props.getProducts(this.props.productData, 1, this.state.limit,
            this.props.filterName, this.state.filterCategoires, e.target.value);
    }

    componentWillMount() {
        // this.props.getProducts(this.props.productData, 1, this.state.limit);
        this.props.fetchAllCategories();
        this.props.getProducts(this.props.productData, 1, this.state.limit, 
            this.props.filterName, this.props.filterCategoires, this.props.filterSort);
        if (!this.props.productData) {
            this.setState({
                products: this.props.productData.products
            })
            if (this.props.jobData) {
                this.setState({
                    totalDocs: this.props.productData.totalDocs,
                    totalPages: this.props.productData.totalPages,
                    limit: this.props.productData.limit,
                    nextPage: this.props.productData.nextPage,
                    prevPage: this.props.productData.prevPage,
                    activePage: this.props.productData.page,
                });
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps.products: ", JSON.stringify(nextProps.productData));
        if (nextProps.productData.page) {
            this.setState({
                totalDocs: nextProps.productData.totalDocs,
                totalPages: nextProps.productData.totalPages,
                limit: nextProps.productData.limit,
                nextPage: nextProps.productData.nextPage,
                prevPage: nextProps.productData.prevPage,
                activePage: nextProps.productData.page,
                products: nextProps.productData.products,
            })
        }
        if (nextProps.categoriesData){
            console.log("categoriesData:",JSON.stringify(nextProps.categoriesData))
            this.setState({
                cetagoriesSet: nextProps.categoriesData
            })
        }
    };

    render() {
        if (this.state.ProductDetailsView) {
            return (
                <Styles>
                    <ProductDetailsDashBoard Product={this.state.SelectedProduct} onBackClickListner={this.onBackClickListner} />
                </Styles>
            )
        } else {
            return (
                <Styles>
                    <div className="product-filter-bar"></div>
                    <Row>
                        <Col sm={2} md={2}>
                            <div style={{ padding: "5px" }} className="product-sidebar">
                                <Row style={{ paddingLeft: "15px" }}>
                                    <Typography variant="h6" gutterBottom>
                                        Filter
                                     </Typography>
                                </Row>
                                <div style={{ paddingLeft: "25px" }}>
                                    <Row>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Categories
                                     </Typography>
                                    </Row>
                                    {
                                        this.state.cetagoriesSet.map((data, id) => {
                                            return (
                                                <Form.Check type="checkbox" onChange={this.handleCheckBoxChange} defaultChecked={this.isCategoryInFilter(data)} name={data} label={data} />
                                                // <Row>{data}</Row>
                                            )
                                        })
                                    }
                                </div>
                                <Row style={{ paddingTop: "10px", paddingLeft: "25px" }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Sorted By
                                     </Typography>
                                </Row>
                                <Form.Control as="select" onChange={this.onSortinOptionsChangeListner}>
                                    <option value={""}>None</option>
                                    <option value={"Price"}>Price: Low to High</option>
                                    <option value={"-Price"}>Price: High to Low</option>
                                    <option value={"-Rating"}>Rating</option>
                                </Form.Control>
                            </div>
                        </Col>
                        <Col>
                            <div className="product-dashboard">
                                <GridList cellHeight={50} >
                                    {this.state.products.map((product, id) => (
                                        <ProductTile Product={product} id={id} onProductCardListner={this.onProductCardListner} />
                                    ))}
                                </GridList>
                            </div>
                            <div className="product-dashboard-pagination">
                                <Pagination count={this.state.totalPages} page={this.state.activePage} onChange={this.handleChange} size="large" shape="rounded" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="product-dashboard-pagination"></div>
                    </Row>
                </Styles>
            );
        }
    }
}


const mapStateToProps = state => {
    return {
        productData: state.customerProductData,
        filterCategoires: getFilterCategories(state.customerProductData),
        filterName: getFilterName(state.customerProductData),
        filterSort: getFilterSort(state.customerProductData),
        categoriesData: state.categories.Categories,
    };
};


export default connect(mapStateToProps, { getProducts, fetchAllCategories })(ProductDashBoard);