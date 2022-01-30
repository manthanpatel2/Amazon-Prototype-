import React, { Component } from "react";
import { connect } from "react-redux";
import '../sellerProfile/sellerProfile.css';
import { Card, Form, Button, InputGroup, FormControl, ControlLabel, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CardBody } from "react-bootstrap/Card";
import Axios from "axios";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { updateSellerAddress } from '../../../Redux/actions/seller/sellerProfileActions';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: [],
            testaddress: [],
            addressid: 0,
            Street: "",
            Apt: "",
            City: "",
            State: "",
            Zipcode: "",
            Country: "",
            editAddressIndex: -1,
            showeditaddress: false,
            showaddaddress: false,
        };
    }
    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value })

    componentDidMount() {
        if (this.props.AddressData) {
            this.setState({
                address: this.props.AddressData
            });
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.AddressData) {
            this.setState({
                Street: nextProps.AddressData.Street,
                Apt: nextProps.AddressData.Apt,
                City: nextProps.AddressData.City,
                State: nextProps.AddressData.State,
                Zipcode: nextProps.AddressData.Zipcode,
                Country: nextProps.AddressData.Country,
            });
        }
    }
    editAddress = () => {
        this.setState({
            showeditaddress: true,
        });
    };


    updateAddressToList = (e) => {
        e.preventDefault();
        if (!this.state.Street || !this.state.City || !this.state.State || !this.state.Country || !this.state.Zipcode) {
            return;
        }
        var newAddress = {
            Street: this.state.Street,
            Apt: this.state.Apt,
            City: this.state.City,
            State: this.state.State,
            Zipcode: this.state.Zipcode,
            Country: this.state.Country,
        }
        
        this.props.updateSellerAddress({ address: newAddress, id: localStorage.getItem("id") });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    address() {
        if (this.state.address.length === 0) {
            return <p>Add atleast one address to your account</p>
        }
    }


    render() {
        var savebutton = (
            <button
                type="submit"
                onClick={this.addAddress}
                className="btn btn-warning text-light"
                data-target="#addaddressid"
                style={{ width: "30%" }}>
                Add address
            </button>
        );
        if (this.state.showeditaddress === true) {
            console.log("tesstaddress is value", this.state.testaddress);
            console.log("id for address val", this.state.addressid);
            console.log("address array", this.state.address);
            var addressedit = (
                <Card.Body>
                    <div aria-labelledby="addadderessid">
                        <div className="address1" id="basicaddress">
                            <Card.Title>
                                <div id="addadderessid">
                                    Update address
                    </div>
                            </Card.Title>
                            <Form>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon2">Street</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Street name and no.,"
                                        name="Street"
                                        value={this.state.Street}
                                        aria-describedby="basic-addon2"
                                        onChange={this.onValueChangeHandler}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3">Apt</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="House no.,"
                                        name="Apt"
                                        value={this.state.Apt}
                                        aria-describedby="basic-addon3"
                                        onChange={this.onValueChangeHandler}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon4">City</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Enter your City"
                                        name="City"
                                        value={this.state.City}
                                        aria-describedby="basic-addon4"
                                        onChange={this.onValueChangeHandler}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon5">State</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Enter your State"
                                        name="State"
                                        value={this.state.State}
                                        aria-describedby="basic-addon6"
                                        onChange={this.onValueChangeHandler}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon5">Country</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Country"
                                        name="Country"
                                        value={this.state.Country}
                                        aria-describedby="basic-addon6"
                                        onChange={this.onValueChangeHandler}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon7">Pincode</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Pincode"
                                        name="Zipcode"
                                        value={this.state.Zipcode}
                                        aria-describedby="basic-addon7"
                                        onChange={this.onValueChangeHandler}
                                    />
                                </InputGroup>

                                <center>
                                    <button
                                        onClick={this.updateAddressToList}
                                        className="btn btn-warning text-light"
                                        style={{ width: "30%" }}>
                                        Update address
                                        </button>
                                    <button type="submit" className="btn btn-dark text-light" style={{ width: "30%" }} onSubmit={this.canceleditaddresschanges}>Cancel</button>
                                </center>
                            </Form>
                        </div>
                    </div>
                </Card.Body>
            )
        }

        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Body>
                            <div>
                                <Card.Header style={{ width: "100%" }}>
                                    Your saved addresses
                            </Card.Header>
                                <Form.Text className="text-muted">
                                    <i>Update or delete your address(es).</i>
                                    <Row>
                                        <Col>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {this.state.Street} <br />
                                   Apt {this.state.Apt} <br />

                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom>
                                                {this.state.City}, {this.state.State}, {this.state.Zipcode}
                                            </Typography>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {this.state.Country}
                                            </Typography>
                                        </Col>
                                        <Col >
                                            <div style={{ width: "100%" }}>
                                                <EditIcon onClick={this.editAddress} style={{ float: 'right' }}></EditIcon>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form.Text>
                            </div>
                    </Card.Body>
                    {addressedit}
                    <Form.Text className="text-muted">
                        <i>This is your default delivery address.</i>
                    </Form.Text>
                    </Card.Body>
                </Card>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    AddressData: state.sellerProfile.Address
});

export default connect(mapStateToProps, { updateSellerAddress })(Address);