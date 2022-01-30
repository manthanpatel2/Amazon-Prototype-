import React, { Component } from "react";
import { connect } from "react-redux";
import Cards from 'react-credit-cards';
import '../customerProfile/customerProfile.css';
import 'react-credit-cards/es/styles-compiled.css';
import { Card, Form, Button, InputGroup, FormControl, ControlLabel, Row, Col, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CardBody } from "react-bootstrap/Card";
import Axios from "axios";
import SaveIcon from '@material-ui/icons/Save';
import CreditCard from './creditCard';
import { fetchCustomerProfile, deletPaymentOption, updatePaymentOptions } from '../../../Redux/actions/customer/customerProfileActions';
import DatePicker from "react-datepicker";

class PaymentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            testcard: [],
            Number: "",
            NameOnCard: "",
            ExpDate: "",
            focus: '',
            CVC: "",
            validUser: {
                status: true,
                message: ""
            },
            validDate: {
                status: true,
                message: ""
            },
            showeditcard: false,
            showaddcard: false,
        }
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    changeCardFields = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
    // handleChange = date => {
    //     this.setState({
    //       startDate: date
    //     });
    //   };

    handleInputChangeDate = (e) => {
        this.setState({
            ExpDate: e.target.value.substring(0, 2) + "/" + e.target.value.substring(2, 4),
            valid: { status: true, message: "" }
        });
    }



    componentDidMount() {
        if (this.props.PaymentData) {
            this.setState({
                cards: this.props.PaymentData,
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.PaymentData) {
            this.setState({
                cards: nextProps.PaymentData,
            })
        }
    }


    deleteCard = (card_id) => () => {
        console.log("CardId:", card_id);
        var newCards = this.state.cards;
        var index1 = card_id;
        if (index1 > -1) {
            newCards.splice(card_id, 1);
        }
        console.log(newCards);
        var data = {
            customerId: localStorage.getItem("id"),
            cards: newCards,
        };
        this.props.deletPaymentOption(data, card_id);
    };

    cardValidate = () => {
        if (this.state.Number.length != 16) {
            return false;
        }

        if (!this.state.NameOnCard) {
            return false;
        }
        return true;
    }

    addCard = () => {
        console.log("inside add card");
        if (!this.cardValidate()) {
            return (<Alert>Invalid card details</Alert>);
        }

        const card = {
            Number: this.state.Number,
            NameOnCard: this.state.NameOnCard

        }
        console.log("card", card);
        var arr = this.state.cards;
        arr.push(card);
        this.setState({
            cards: arr
        });
        this.props.updatePaymentOptions(card, localStorage.getItem("id"));
    };


    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { validUser } = this.state;
        const { validDate } = this.state;
        var savebutton = (
            <button

                onClick={this.addCard}
                className="btn btn-warning text-light"
                data-target="#addcardid"
                style={{ width: "100%", marginLeft: "30%" }}>
                Add Payment
            </button>
        );
        if (this.state.showaddcard === true) {
            var addcardvar = {};
        }

        var it1 = -1;
        const test2 = this.state.testcard;
        console.log("test2 is", test2);
        const card_var = this.state.cards.map((card, index) => {
            it1 = it1 + 1;
            var id1 = 0;
            return (

                <Form.Text className="text-muted">
                    <i>Update or delete your payment card(s).</i>
                    <CreditCard Card={card} index={index} deleteCard={this.deleteCard} />
                </Form.Text>
            );
        });

        // if (this.state.showeditcard === true && this.state.testcard.length > 0) {
        //     console.log("tesstcard is value", this.state.testcard);
        //     console.log("id for card val", this.state.cardid);
        //     console.log("card array", this.state.card);
        //     var cardedit = (
        //         <Card.Body>
        //             <div aria-labelledby="cardid">
        //                 <div className="address1" id="basiccard">
        //                     <Card.Title>
        //                         <div id="addcardid">
        //                             Add new card
        //             </div>
        //                     </Card.Title>
        //                     <form>

        //                         <input type="tel"
        //                             name="number"
        //                             placeholder="Card Number"
        //                             value={
        //                                 this.state.card[this.state.cardid].obj_number
        //                             }
        //                             aria-describedby="basic-addon1"
        //                             onChange={this.changeCardFields}
        //                             onFocus={this.handleInputFocus} />

        //                         <input type="text"
        //                             name="number"
        //                             placeholder="Card Name"
        //                             value={
        //                                 this.state.card[this.state.cardid].obj_name
        //                             }
        //                             aria-describedby="basic-addon1"
        //                             onChange={this.changeCardFields}
        //                             onFocus={this.handleInputFocus} />

        //                         <input type="DD MM"
        //                             name="number"
        //                             placeholder="Valid Thru"
        //                             value={
        //                                 this.state.card[this.state.cardid].obj_validThru
        //                             }
        //                             aria-describedby="basic-addon1"
        //                             onChange={this.changeCardFields}
        //                             onFocus={this.handleInputFocus} />

        //                         <input type="number"
        //                             name="number"
        //                             placeholder="CVC"
        //                             value={
        //                                 this.state.card[this.state.cardid].obj_cvc
        //                             }
        //                             aria-describedby="basic-addon1"
        //                             onChange={this.changeCardFields}
        //                             onFocus={this.handleInputFocus} />


        //                         <center>
        //                             <button type="submit"
        //                                 onSubmit={this.saveEditCardChanges}
        //                                 className="btn btn-warning text-light"
        //                                 style={{ width: "30%" }}>
        //                                 Save card
        //             </button>
        //                             <button type="submit" className="btn btn-dark text-light" style={{ width: "30%" }} onSubmit={this.cancelEditCardChanges}>Cancel</button>
        //                         </center>
        //                     </form>
        //                 </div>
        //             </div>
        //         </Card.Body>
        //     )
        // }

        return (
            <div>
                <Card>
                    <Card.Header>
                        Manage your Credit/ Debit cards
                        </Card.Header>
                    <Form.Text className="text-muted">
                        <i> You can add upto 3 Credit/ Debit cards for security reasons.</i><br />
                        <i>Amazon never stores your Payment information.</i>
                    </Form.Text>

                    <div>
                        <Row style={{ padding: "10px" }}>
                            <Col sm={8} md={8}>
                                <Row>
                                    <Col sm={4} md={4}></Col>
                                    <Col sm={5} md={5}>
                                        <Cards
                                            CVC={this.state.CVC}
                                            expiry={this.state.ExpDate}
                                            focused={this.state.ExpDate}
                                            name={this.state.NameOnCard}
                                            number={this.state.Number}
                                        />
                                    </Col>
                                    <Col sm={3} md={3}>
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
                                        </Form>
                                    </Col>
                                </Row>


                            </Col>
                            {/* <Col sm={2} md={2}>
                                <Row style={{ width: "100%" }}>
                                    <SaveIcon style={{ float: "right" }} onClick={this.onUpdateCardListner}></SaveIcon>
                                </Row>
                            </Col> */}
                        </Row>
                        <Row>
                            <div>{savebutton}</div>
                        </Row>
                    </div>
                    {/* <div>{addcardvar}</div> */}
                    <div classname="savedadd">
                        <Card.Header style={{ width: "100%" }}>
                            Your saved payment
                            </Card.Header>
                        <div>{card_var}</div>
                    </div>
                    {/* <div>{cardedit}</div> */}

                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    PaymentData: state.customerProfile.Payments
});

export default connect(mapStateToProps, { fetchCustomerProfile, deletPaymentOption, updatePaymentOptions })(PaymentCard);