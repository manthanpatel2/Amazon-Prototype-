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
import { getProducts, addProduct } from '../../../Redux/actions/seller/productAction';
import Paper from '@material-ui/core/Paper';
import MaterialUiButton from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import { getFilterCategories, getFilterName, getFilterSort } from '../../../Redux/selectors/customer/selector';
import Typography from '@material-ui/core/Typography';
import {fetchAllCategories} from './../../../Redux/actions/admin/categoriesActions';


const Styles = styled.div`
    .product-filter-bar{
        height: 35px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .product-sidebar{
        padding:2px;
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
    .add-product-button-bar {
        margin: 1px;
        width: 98%;
        margin: 1px;
      },
    .add-product-button {
        margin: 2px;
    }
    .chip-paper {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    }
    .category-chip {
       margin: 1px;
       height: 15px;
       padding: 1px;
    }
    .product-dashboard{
        width: 100%;
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
            SelectedId: null,
            modalShow: false,
            imageModalShow: false,
            ProductImages: [],
            cetagoriesSet: ["",],
            SelectedCetagories: [],
            filterCategoires: [],

        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }


    handleChange = (e, value) => {
        e.preventDefault();
        this.props.getProducts(this.props.productData, localStorage.getItem("id"), value, this.state.limit,
            this.props.filterName, this.props.filterCategoires, this.props.filterSort);
    };

    handleDelete = (id) => () => {
        var arr = this.state.SelectedCetagories;
        arr.splice(id, 1);
        this.setState({
            SelectedCetagories: arr,
        });
    };

    handleSelectListener = (e) => {
        console.log("SelectedCetagory: ", e.target.value)
        for (var i = 0; i < this.state.SelectedCetagories.length; i++) {
            if (this.state.SelectedCetagories[i] == e.target.value) {
                return;
            }
        }
        var arr = this.state.SelectedCetagories;
        arr.push(e.target.value);
        this.setState({
            SelectedCetagories: arr
        });

    }

    handleClose = (e) => {
        // e.preventDefault();
        this.setState({
            modalShow: false,
        })
    };

    handleShow = (e) => {
        e.preventDefault();
        console.log("Inside handleShow");
        this.setState({
            modalShow: true,
        })
    };

    onProductCardListner = (id) => {
        console.log("Product id: ", id);
        this.setState({
            SelectedProduct: this.state.products[id],
            SelectedId: id,
            ProductDetailsView: true,
        });
    };

    onFileUploadChangeHandler = event => {
        console.log("Images Files: ", JSON.stringify(event.target.files));
        this.setState({
            ProductImages: event.target.files,
        })
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
        this.props.getProducts(this.props.productData, localStorage.getItem("id"), 1, this.state.limit,
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

    onAddProductClick = (e) => {
        e.preventDefault();
        const product = {
            Name: this.state.Name,
            Price: this.state.Price,
            Description: this.state.Description,
            SellerId: localStorage.getItem("id"),
            SellerName: localStorage.getItem("name"),
            Categories: this.state.cetagoriesSet,
        }
        this.handleClose();
        this.props.addProduct(product, this.state.ProductImages);
    }

    onBackClickListner = () => {
        this.setState({
            SelectedProduct: null,
            ProductDetailsView: false,
        });
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

    onSortinOptionsChangeListner = (e) => {
        // console.log("value: ",e.target.value);
        this.props.getProducts(this.props.productData, localStorage.getItem("id"), 1, this.state.limit,
            this.props.filterName, this.state.filterCategoires, e.target.value);
    }
    componentDidMount() {
        this.props.fetchAllCategories();
        var sellerId = localStorage.getItem("id");
        this.props.getProducts(this.props.productData, localStorage.getItem("id"), 1, this.state.limit, this.props.filterName, this.props.filterCategoires);
        if (!this.props.productData) {
            this.setState({
                products: this.props.productData.products
            })
            if (this.props.productData) {
                this.setState({
                    totalDocs: this.props.productData.totalDocs,
                    totalPages: this.props.productData.totalPages,
                    limit: this.props.productData.limit,
                    nextPage: this.props.productData.nextPage,
                    prevPage: this.props.productData.prevPage,
                    activePage: this.props.productData.page,
                    filterCategoires: this.props.filterCategoires,
                });
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log("nextProps.products: ", JSON.stringify(nextProps.productData));
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
        if (nextProps.filterCategoires) {
            this.setState({
                filterCategoires: nextProps.filterCategoires,
            });
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
                    <ProductDetailsDashBoard Product={this.state.SelectedProduct} id={this.state.SelectedId} onBackClickListner={this.onBackClickListner} />
                </Styles>
            )
        } else {
            return (
                <Styles>
                    <Modal show={this.state.modalShow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Label className="signup-form-lable">Product Name</Form.Label>
                                        <Form.Control onChange={this.onValueChangeHandler} name="Name" placeholder="Product name" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Label className="signup-form-lable">Product Price</Form.Label>
                                        <Form.Control onChange={this.onValueChangeHandler} name="Price" type="Number" placeholder="Product price" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Categories</Form.Label>
                                            <Form.Control as="select" onChange={this.handleSelectListener}>
                                                {
                                                    this.state.cetagoriesSet.map((data, id) => {
                                                        return (
                                                            <option>{data}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>

                                        <GridList cellHeight={40} spacing={1} cols={Math.min(this.state.cetagoriesSet.length, 4)} >
                                            {this.state.SelectedCetagories.map((data, id) => {
                                                return (
                                                    <GridListTile className="category-chip">
                                                        <Chip
                                                            label={data}
                                                            onDelete={this.handleDelete(id)}
                                                        />
                                                    </GridListTile>
                                                )
                                            })}
                                        </GridList>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Label className="signup-form-lable">Upload Product Images</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="employer">
                                        <input type="file" multiple name="file" onChange={this.onFileUploadChangeHandler} />
                                        <div className="images-upload-button">
                                            {/* <MaterialUiButton
                                                variant="contained"
                                                color="default"
                                                size="small"
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Upload
                                            </MaterialUiButton> */}
                                        </div>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="end_date">
                                        <Form.Label>Product Description</Form.Label>
                                        <Form.Control as="textarea" name="Description" onChange={this.onValueChangeHandler} placeholder="Write description here..." rows="3" />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.onAddProductClick}>
                                Add Product
                            </Button>
                        </Modal.Footer>
                    </Modal>
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
                        <Col >
                            <Row>
                                <Paper className="add-product-button-bar">
                                    <MaterialUiButton
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="add-product-button"
                                        startIcon={<AddIcon />}
                                        onClick={this.handleShow}
                                    >
                                        Add Product
                                    </MaterialUiButton>
                                </Paper>
                            </Row>
                            <Row className="product-dashboard">
                                {this.state.products &&
                                    <GridList cellHeight={50} >
                                        {this.state.products.map((product, id) => (
                                            <ProductTile Product={product} id={id} onProductCardListner={this.onProductCardListner} />
                                        ))}
                                    </GridList>
                                }
                            </Row>
                            <Row className="product-dashboard-pagination">
                                <Pagination count={this.state.totalPages} page={this.state.activePage} onChange={this.handleChange} size="large" shape="rounded" />
                            </Row>
                        </Col>
                    </Row>
                </Styles >
            );
        }
    }
}


const mapStateToProps = state => {
    return {
        productData: state.sellerProductData,
        filterCategoires: getFilterCategories(state.sellerProductData),
        filterName: getFilterName(state.sellerProductData),
        filterSort: getFilterSort(state.sellerProductData),
        categoriesData: state.categories.Categories,
    };
};


export default connect(mapStateToProps, { getProducts, addProduct,fetchAllCategories })(ProductDashBoard);