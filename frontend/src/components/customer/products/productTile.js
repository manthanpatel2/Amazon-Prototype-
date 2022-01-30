import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert, Pagination, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Image from 'material-ui-image';


const Styles = styled.div`
.product-tile-image{
    padding: 5px;
    max-height: 250px;
    max-width: 245px;
}
.product-tile-card{
    width: 255px;
    height: 375px;
    margin: 5px;
}
`;

class ProductTile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.Product.Name,
            Rating: this.props.Product.Rating,
            Price: this.props.Product.Price,
            Images: this.props.Product.Images,
        }
    }
    onCardClickListner = (e) => {
        e.preventDefault();
        this.props.onProductCardListner(this.props.id);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.Product) {
            this.setState({
                Name: nextProps.Product.Name,
                Rating: nextProps.Product.Rating,
                Price: nextProps.Product.Price,
                Images: nextProps.Product.Images,
            })
        }
    };

    render() {
        var productImage = null;
        if (this.state.Images.length > 0) {
            productImage = this.state.Images[0];
        }
        return (
            <Styles>
                {/* <Card className="product-tile-card" style={{ width: '16rem' }} onClick={this.onCardClickListner} >
                    <Card.Img className="product-tile-image" variant="top" src={this.state.ProductImage} />
                    <Card.Body>
                        <Card.Title>{this.state.ProductName}</Card.Title>
                        <Card.Subtitle>$ {this.state.ProductPrice}</Card.Subtitle>
                        <Rating name="simple-controlled" value={this.state.ProductRating} readOnly />
                    </Card.Body>
                </Card> */}

                <Card className="product-tile-card" onClick={this.onCardClickListner}>
                    <CardActionArea>
                        <div className="product-tile-image">
                            {productImage ? (
                                <Image
                                    src={productImage}
                                    title={this.state.Name}
                                    animation="wave"
                                    disableSpinner
                                />
                                // <Skeleton variant="rect" animation="wave" width={250} height={245} />
                            ) : (
                                    <Skeleton variant="rect" animation="wave" width={250} height={245} />
                                )}

                        </div>
                    </CardActionArea>
                    <CardActions>
                        <Typography component="h7" variant="h7">
                            {this.state.Name}</Typography>
                    </CardActions>
                    <CardActions>
                        <Typography component="h7" variant="h7">$ {this.state.Price}</Typography>
                    </CardActions>
                    <CardActions>
                        <Rating name="half-rating-read" value={this.state.Rating} precision={0.2} readOnly />
                    </CardActions>
                </Card>
            </Styles>
        );
    }
}


const mapStateToProps = state => {
    return {

    };
};


export default connect(mapStateToProps, {})(ProductTile);