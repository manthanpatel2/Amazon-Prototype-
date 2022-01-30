import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Carousel, Form, Modal, Button as BButton } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Navbar from '../navbar/navbar';
import ProductTile from './productTile';
import { Icon, Typography, Chip, Divider, Button, InputLabel, MenuItem, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import Rating from '@material-ui/lab/Rating';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import CategoryIcon from '@material-ui/icons/Category';
import FormControl from '@material-ui/core/FormControl';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Select from '@material-ui/core/Select';
import Image from 'material-ui-image';
import ReviewTile from './reviewTile';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { updateSellerProduct, deleteProduct } from '../../../Redux/actions/seller/productAction';
import { fetchAllCategories } from './../../../Redux/actions/admin/categoriesActions';



import { getReviewsForProduct } from '../../../Redux/actions/customer/reviewActions';


const Styles = styled.div`
.product-details-addtocartbar{
    padding: 20px;
    height: 250px;
    width: 250px;
    box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
}
.product-details-bar{
    height: 35px;
    
}
.product-details-back-button{
    height: 35px;
    width: 35px;
    margin-left:15px;
}
.product-details-image-section{
    
    width: 550px;
    margin-left: 35px;
    overflow-x: scroll;
    padding: 5px;
}
.product-details-image{
    height: 450px;
    width: 500px;
}

.product-details-divider{
    margin: 2px;
    margin-bottom: 5px;
}
.product-detail-price{
    color: #B71C1C;
}
.product-detail-instock{
    color: #1B5E20;
    margin-bottom: 25px;
}
.product-details-quantity{
    width: 200px;
    margin-bottom: 25px;
}
.product-details-chips{
    padding-left: 5px;
    margin-left: 2px;
    min-height:10px;
    max-hight: 50px;
    overflow-y: scroll;

}
.product-details-add-to-cart-button{
    margin:5px;
    padding-top: 15px;
    width: 200px;
    background-color: #E65100;
}
.chip-divider{
    width:px;
}
.product-details-review-section{
    margin: 15px;
    margin-left:35px;
}
.product-details-review-section-list{
    margin: 15px;
    margin: 55px;
}
.product-details-add-review-section{
    margin: 15px;
    margin-left:65px;
    padding: 10px;
    width: 800px;
}
.product-details-add-review-box{
    width: 800px;
}
.product-details-details-section{
    margin: 10px;
}
.product-details-offer-row{
    margin: 5px;
}
.product-details-offer-icon{
    margin: 2px;
    margin-right:5px;
}
.review-submit-button{
    margin: 2px;
    display: flex; 
    width: 800px;
    justify-content: flex-end;
}
`;
class ProductDetailsDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.Product.Name,
            Price: this.props.Product.Price,
            Images: this.props.Product.Images,
            SellerName: this.props.Product.Seller.Name,
            Rating: this.props.Product.Rating,
            Reviews: [],
            Offers: this.props.Product.Offers,
            Description: this.props.Product.Description,
            Categories: this.props.Product.Categories,
            modalShow: false,
            offerModalShow: false,
            NewOffer: "",
            cetagoriesSet: ["",],
            SelectedCetagories: [],
            Offerset: [],
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOfferShow = this.handleOfferShow.bind(this);
        this.handleOfferClose = this.handleOfferClose.bind(this);
        this.deleteButtonClickListner = this.deleteButtonClickListner.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllCategories();
        this.props.getReviewsForProduct(this.props.Product._id);
        if (this.state.SelectedCetagories.length < 1 && this.props.Product.Categories) {
            var arr = [];
            for (var i = 0; i < this.props.Product.Categories.length; i++) {
                arr.push(this.props.Product.Categories[i]);
            }
            this.setState({
                SelectedCetagories: arr
            });
        }
        if (this.state.Offerset.length < 1 && this.props.Product.Offers) {
            var arr = [];
            for (var i = 0; i < this.props.Product.Offers.length; i++) {
                arr.push(this.props.Product.Offers[i]);
            }
            this.setState({
                Offerset: arr
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log("nextProps.products: ", JSON.stringify(nextProps.reviewData));
        this.setState({
            Reviews: nextProps.reviewData.reviews,
        })
        if (nextProps.categoriesData) {
            console.log("categoriesData:", JSON.stringify(nextProps.categoriesData))
            this.setState({
                cetagoriesSet: nextProps.categoriesData
            })
        }
    };

    onFileUploadChangeHandler = event => {
        console.log("Images Files: ", JSON.stringify(event.target.files));
        this.setState({
            ProductImages: event.target.files,
        })
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value })

    handleChange = (e, value) => {
        e.preventDefault();
        this.props.getProducts(this.props.productData, localStorage.getItem("id"), value, this.state.limit);
    };

    handleDeleteOffer = (id) => () => {
        var arr = this.state.Offerset;
        arr.splice(id, 1);
        this.setState({
            Offerset: arr,
        });
    }

    addOffer = () => {
        var arr = this.state.Offerset;
        if (this.state.NewOffer) {
            arr.push(this.state.NewOffer)
            this.setState({
                Offerset: arr,
                NewOffer: "",
            });
        }

    }

    deleteButtonClickListner = (e) => {
        this.props.onBackClickListner();
        this.props.deleteProduct(this.props.Product._id, this.props.id);

    }

    handleSelectListener = (e) => {
        console.log("SelectedCetagory: ", e.target.value)
        console.log("Cetogries: ", this.state.Categories);
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

    handleDelete = (id) => () => {
        var arr = this.state.SelectedCetagories;
        arr.splice(id, 1);
        this.setState({
            SelectedCetagories: arr,
        });
    };

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

    handleOfferClose = (e) => {
        // e.preventDefault();
        this.setState({
            offerModalShow: false,
        })
    };

    handleOfferShow = (e) => {
        e.preventDefault();
        console.log("Inside handleShow");
        this.setState({
            offerModalShow: true,
        })
    };
    getUpdatedProduct = () => {
        // if(!this.state.Name || !this.state.Description || !this.state.Price){
        //     return null;
        // }
        const product = {
            _id: this.props.Product._id,
            Seller: this.props.Product.Seller,
            Name: this.state.Name,
            Images: this.props.Product.Images,
            Rating: this.props.Product.Rating,
            Offers: this.state.Offers,
            Price: this.state.Price,
            Description: this.state.Description,
            Reviews: this.props.Product.Reviews,
            Categories: this.state.Categories,
        }
        return product;
    }

    updateProduct = (e) => {
        e.preventDefault();
        this.handleClose();
        var arr = [];
        for (var i = 0; i < this.state.SelectedCetagories.length; i++) {
            arr.push(this.state.SelectedCetagories[i]);
        }
        this.setState({
            Categories: arr
        })
        const product = this.getUpdatedProduct();
        product.Categories = arr;
        // console.log("Updated Product: ", JSON.stringify(product));
        // console.log("Id: ", this.props.id);
        this.props.updateSellerProduct(product, this.props.id)
    }

    updateOffers = (e) => {
        this.handleOfferClose();
        e.preventDefault();
        var arr = [];
        for (var i = 0; i < this.state.Offerset.length; i++) {
            arr.push(this.state.Offerset[i]);
        }
        this.setState({
            Offers: arr
        });
        const product = this.getUpdatedProduct();
        product.Offers = arr;
        this.props.updateSellerProduct(product, this.props.id)
    }

    render() {
        var reviews = []
        if (this.state.Reviews) {
            reviews = this.state.Reviews.map((review) => {
                return (
                    <ReviewTile Review={review} />
                )
            });
        };

        return (
            <Styles>
                <Modal show={this.state.offerModalShow} onHide={this.handleOfferClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Offers</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.state.Offerset.map((offer, id) => {
                            return (
                                <Row className="product-details-offer-row">
                                    <Col sm={1} md={1}>
                                        <LocalOfferIcon color="disabled" className="product-details-offer-icon" color="action" ></LocalOfferIcon>
                                    </Col>
                                    <Col sm={8} md={8}>
                                        <Typography variant="span" color="" component="span">
                                            {offer}
                                        </Typography>
                                    </Col>
                                    <Col>
                                        <DeleteIcon color="disabled" style={{ float: "right", marginRight: "5px" }} onClick={this.handleDeleteOffer(id)} ></DeleteIcon>
                                    </Col>
                                </Row>
                            )
                        })
                        }
                        <br />
                        <Form>
                            <Form.Row>
                                <Form.Label>Add Offer</Form.Label>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group style={{ width: "88%" }} controlId="end_date">
                                    <Form.Control as="textarea" name="NewOffer" onChange={this.onValueChangeHandler} placeholder="Write Offer here..." value={this.state.NewOffer} rows="2" />
                                </Form.Group>
                                <Form.Group controlId="end_date">
                                    <BButton variant="warning" style={{ height: "100%" }} onClick={this.addOffer} >Add</BButton>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    {/* <Modal.Footer>
                      
                    </Modal.Footer> */}
                    <Modal.Footer>
                        <BButton variant="secondary" onClick={this.handleOfferClose} >Close</BButton>
                        <BButton variant="primary" onClick={this.updateOffers}>Save changes</BButton>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="employer">
                                    <Form.Label className="signup-form-lable"></Form.Label>
                                    {/* <TextField id="standard-basic" label="Product Name" defaultValue={this.state.Name} onChange={this.onValueChangeHandler}  /> */}
                                    <Form.Control onChange={this.onValueChangeHandler} name="Name" placeholder="Product name" defaultValue={this.state.Name} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="employer">
                                    <Form.Label className="signup-form-lable">Product Price</Form.Label>
                                    <Form.Control onChange={this.onValueChangeHandler} name="Price" type="Number" placeholder="Product price" defaultValue={this.state.Price} />
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
                                <Form.Group as={Col} controlId="end_date">
                                    <Form.Label>Product Description</Form.Label>
                                    <Form.Control as="textarea" name="Description" onChange={this.onValueChangeHandler} placeholder="Write description here..." rows="3" defaultValue={this.state.Description} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <BButton variant="secondary" onClick={this.handleClose}>
                            Close
                            </BButton>
                        <BButton variant="primary" onClick={this.updateProduct}>
                            Edit Product
                            </BButton>
                    </Modal.Footer>
                </Modal>

                <Row className="product-details-bar">
                    <Col>
                        <Tooltip title="Back" style={{ float: "left", marginRight: "15px" }}>
                            <ArrowBackIcon className="product-details-back-button" onClick={this.props.onBackClickListner} type=""></ArrowBackIcon>
                        </Tooltip>
                    </Col>
                    <Col>
                        <Tooltip title="Delete Product" style={{ float: "right", marginRight: "15px" }}>
                            <DeleteIcon onClick={this.deleteButtonClickListner}></DeleteIcon>
                        </Tooltip>

                    </Col>
                </Row>
                <Row >
                    <Col sm={5.5} md={5.5}>
                        <div className="product-details-image-section">
                            <Carousel>
                                {this.state.Images.map((image) => {
                                    return (
                                        <Carousel.Item>
                                            <Image
                                                onClick={() => console.log('onClick')}
                                                className="product-details-image"
                                                src={image}
                                                animation="wave"
                                                disableSpinner
                                            />
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </div>
                    </Col>
                    <Col sm={6} md={6}>
                        <Row className="product-details-details-section">
                            <Col sm={10} md={10}>
                                <Typography variant="h4" component="h4">
                                    {this.state.Name}
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    By {this.state.SellerName}
                                </Typography>
                                <Rating name="half-rating-read" value={this.state.ProductRating} precision={0.2} readOnly />
                                <Divider variant="inset" component="li" className="product-details-divider" />
                                <Typography variant="h6" color="primary" component="h6">
                                    Price: $ {this.state.Price}
                                </Typography>
                                <Row className="product-details-chips">
                                    <GridList cellHeight={35} spacing={2} cols={Math.min(this.state.Categories.length, 4)}>
                                        {this.state.Categories.map((category) => {
                                            return (
                                                <div>
                                                    <Chip variant="outlined" color="primary" style={{ float: "center" }} label={category} icon={<CategoryIcon fontSize="small" />} />
                                                </div>
                                            )
                                        })}
                                    </GridList>
                                </Row>
                                <Typography variant="h6" component="h6">
                                    Description:
                            </Typography>
                                <Typography variant="span" color="" component="span">
                                    {this.state.Description}
                                </Typography>
                                <Row>
                                    <Col sm={8} md={8}>
                                        <Typography variant="h6" component="h6">
                                            Offers:
                                        </Typography>
                                    </Col>
                                    <Col sm={1} md={1}>
                                        <div style={{ width: "150px", display: "flex", justifyContent: "flex-end" }}>
                                            <Tooltip title="Edit Offers" >
                                                <EditIcon style={{ float: "right", marginRight: "5px" }} onClick={this.handleOfferShow}></EditIcon>
                                            </Tooltip>
                                        </div>

                                    </Col>
                                </Row>

                                {this.state.Offers.map((offer) => {
                                    return (
                                        <Row className="product-details-offer-row">
                                            <Col sm={1} md={1}>
                                                <LocalOfferIcon className="product-details-offer-icon" color="action" ></LocalOfferIcon>
                                            </Col>
                                            <Col sm={8} md={8}>
                                                <Typography variant="span" color="" component="span">
                                                    {offer}
                                                </Typography>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Col>
                            <Col sm={1} md={1}>
                                <Tooltip title="Edit Product" >
                                    <EditIcon style={{ display: "flex", justifyContent: "flex-end", marginRight: "5px" }} onClick={this.handleShow}></EditIcon>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Col>

                </Row>
                <Row className="product-details-review-section">
                    <div >
                        <Typography variant="h6" component="h6">
                            Reviews
                        </Typography>
                    </div>
                </Row>
                <Row className="product-details-review-section-list">
                    <List>
                        {reviews}
                    </List>
                </Row>
            </Styles>
        );
    }
}


const mapStateToProps = state => {
    return {
        reviewData: state.customerReviewData,
        categoriesData: state.categories.Categories,
    };
};


export default connect(mapStateToProps, { getReviewsForProduct, updateSellerProduct, deleteProduct, fetchAllCategories })(ProductDetailsDashBoard);