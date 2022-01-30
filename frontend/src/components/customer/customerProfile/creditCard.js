import React, { Component } from "react";
import { connect } from "react-redux";
import Cards from 'react-credit-cards';
import '../customerProfile/customerProfile.css';
import 'react-credit-cards/es/styles-compiled.css';
import { Card, Form, Button, InputGroup, FormControl, ControlLabel, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CardBody } from "react-bootstrap/Card";
import Axios from "axios";
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { fetchCustomerProfile, deletPaymentOption, updatePaymentOptions } from '../../../Redux/actions/customer/customerProfileActions';

class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cvc: 0,
            ExpDate: this.props.Card.ExpDate,
            focus: '',
            NameOnCard: this.props.Card.NameOnCard,
            Number: this.props.Card.Number,
            validUser: {
                status: true,
                message: ""
            },
            validDate: {
                status: true,
                message: ""
            },
        }
        this.onUpdateCardListner = this.onUpdateCardListner.bind(this);
    }
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    changeCardFields = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
    handleInputChangeDate = (e) => {
        this.setState({
            validThru:
                e.target.value.substring(0, 2) +
                "/" +
                e.target.value.substring(2, 4),
            valid: { status: true, message: "" }
        });
    }

    // deleteCard = () => {
    //     this.props.deleteCard(this.props.index);
    // };

    onUpdateCardListner = () => {
        // if(this.state.Number.length < 14){
        //     return
        // }
        console.log("onUpdateCardListner caaled")
        const card = {
            Number: this.state.Number,
            NameOnCard: this.state.NameOnCard,
            ExpDate: this.state.ExpDate,
        }
        this.props.updatePaymentOptions(card, this.props.index)
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.Card) {
            this.setState({
                ExpDate: nextProps.ExpDate,
                focus: '',
                NameOnCard: nextProps.Card.NameOnCard,
                Number: nextProps.Card.Number,
            });
        }
    }

    render() {
        return (
            <div>
                <Row style={{ padding: "10px" }}>
                    <Col sm={8} md={8}>
                        <Row>
                            <Col>
                                <Cards
                                    CVC={this.state.CVC}
                                    expiry={this.state.ExpDate}
                                    focused={this.state.ExpDate}
                                    name={this.state.NameOnCard}
                                    number={this.state.Number}
                                />
                            </Col>
                            <Col>
                                <Form>
                                    <Form.Row>
                                        <input type="tel"
                                            name="Number"
                                            placeholder="Card Number"
                                            value={this.state.Number}
                                            style={{ width: "80%" }}
                                            aria-describedby="basic-addon1"
                                            onChange={this.changeCardFields}
                                            onFocus={this.handleInputFocus} />
                                    </Form.Row>
                                    <Form.Row>
                                        <input type="text"
                                            name="NameOnCard"
                                            style={{ width: "80%" }}
                                            placeholder="Card Name"
                                            value={this.state.NameOnCard}
                                            aria-describedby="basic-addon1"
                                            onChange={this.changeCardFields}
                                            onFocus={this.handleInputFocus} />
                                    </Form.Row>
                                    <Form.Row>
                                        <input type="DD MM"
                                            name="ExpDate"
                                            placeholder="Valid Thru"
                                            style={{ width: "80%" }}
                                            value={this.state.ExpDate}
                                            aria-describedby="basic-addon1"
                                            onChange={this.handleInputChangeDate}
                                            onFocus={this.handleInputFocus} />
                                    </Form.Row>
                                    <Form.Row>
                                        <input type="number"
                                            name="CVC"
                                            placeholder="CVC"
                                            style={{ width: "30%" }}
                                            value={this.state.CVC}
                                            aria-describedby="basic-addon1"
                                            onChange={this.changeCardFields}
                                            onFocus={this.handleInputFocus} />
                                    </Form.Row>

                                </Form>
                            </Col>
                        </Row>


                    </Col>
                    <Col sm={2} md={2}>
                        <Row style={{ width: "100%" }}>
                            <SaveIcon style={{ float: "right" }} onClick={this.onUpdateCardListner}></SaveIcon>
                        </Row>
                        <Row style={{ width: "100%" }}>
                            <DeleteForeverIcon onClick={this.props.deleteCard(this.props.index)} style={{ float: "right" }}></DeleteForeverIcon>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    };

}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps, { fetchCustomerProfile, deletPaymentOption, updatePaymentOptions })(CreditCard);