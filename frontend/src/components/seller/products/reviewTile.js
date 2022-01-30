import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';

const Styles = styled.div`
.product-dashboard-review{
    min-height:20px;
    width: 800px;
}
.product-dashboard-vote{
    margin-left: 1px;
}
`;

class ReviewTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductID: this.props.Review.ProductID,
            CustomerId: this.props.Review.CustomerId,
            CustomerName: this.props.Review.CustomerName,
            CustomerUrl: this.props.Review.CustomerUrl,
            Vote: this.props.Review.Vote,
            ReviewText: this.props.Review.ReviewText,
        }
    }
    onCardClickListner = (e) => {
        e.preventDefault();
        this.props.onProductCardListner(this.props.id);
    }



    componentWillReceiveProps(nextProps) {
        console.log("nextProps.Review: ", JSON.stringify(nextProps.Review));
        if (nextProps.Review) {
            this.setState({
                ProductID: nextProps.Review.ProductID,
                CustomerId: nextProps.Review.CustomerId,
                CustomerName: nextProps.Review.CustomerName,
                CustomerUrl: nextProps.Review.CustomerUrl,
                Vote: nextProps.Review.Vote,
                ReviewText: nextProps.Review.ReviewText,
            })
        }
    };


    render() {
        return (
            <Styles>
                <div className="product-dashboard-review" elevation={2}>
                    <Row>
                        <Col sm={1} md={1}>
                            <IconButton aria-label="delete" size="large">
                                <ArrowUpwardIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" className="product-dashboard-vote" size="medium">
                                {this.state.Vote}
                            </IconButton>
                            <IconButton aria-label="delete" size="large">
                                <ArrowDownwardIcon fontSize="inherit" />
                            </IconButton>
                        </Col>
                        <Col sm={8} md={8}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={this.state.CustomerName} src={this.state.CustomerUrl} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={this.state.CustomerName}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                            </Typography>
                                            {this.state.ReviewText}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </Col>
                    </Row>
                    <Divider variant="inset" component="li" />
                </div>

            </Styles>
        );
    }
}
const mapStateToProps = state => {
    return {

    };
};


export default connect(mapStateToProps, {})(ReviewTile);