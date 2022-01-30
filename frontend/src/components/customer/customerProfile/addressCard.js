import React, { Component } from "react";
import { connect } from "react-redux";
import '../customerProfile/customerProfile.css';
import { Card, Form, Button, InputGroup, FormControl, ControlLabel, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CardBody } from "react-bootstrap/Card";
import Axios from "axios";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { saveCustomerAddress, editCustomerAddress } from '../../../Redux/actions/customer/customerProfileActions';

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
            phonenumber: '',
            editAddressIndex: -1,
            showeditaddress: false,
            showaddaddress: false,
        };
        /*
        this.handlesaveAddress= this.handlesaveAddress.bind(this);
        this.handleDelete= this.handleDelete.bind(this);
        this.handleUpdate= this.handleUpdate.bind(this);
        this.handleSetdefault= this.handleSetdefault.bind(this);
        */
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
                address: nextProps.AddressData
            });
        }
    }
    editAddress = id1 => () => {
        this.setState({
            editAddressIndex: id1,
            showeditaddress: true,
            showaddaddress: false,
            Street: this.state.address[id1].Street,
            Apt: this.state.address[id1].Apt,
            City: this.state.address[id1].City,
            State: this.state.address[id1].State,
            Zipcode: this.state.address[id1].Zipcode,
            Country: this.state.address[id1].Country,
        });
    };

    deleteAddress = id => () => {
        var newAddress = this.state.address;
        if (id > -1) {
            newAddress.splice(id, 1);
        }
        this.setState({
            address: newAddress
        });
        this.props.editCustomerAddress({address: newAddress, id: localStorage.getItem("id")});
    };

    addAddress = () => {
        console.log("inside add address");
        this.setState({
            showaddaddress: true,
            showeditaddress:false,
            Street: "",
            Apt: "",
            City: "",
            State: "",
            Zipcode: "",
            Country: "",
        });
    };

    updateAddressToList = (e) => {
        e.preventDefault();
        if(!this.state.Street || !this.state.City || !this.state.State || !this.state.Country || !this.state.Zipcode){
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
        var arr = this.state.address;
        arr[this.state.editAddressIndex] = newAddress;
        this.setState({
            address: arr,
            showeditaddress: false
        });
        this.props.editCustomerAddress({address: arr, id: localStorage.getItem("id")});
    }

    addAddressToList = (e) => {
        e.preventDefault();
        if(!this.state.Street || !this.state.City || !this.state.State || !this.state.Country || !this.state.Zipcode){
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
        var arr = this.state.address;
        arr.push(newAddress);
        // this.setState({
        //     address: arr,
        // });
        this.addAddress();
        this.props.editCustomerAddress({address: arr, id: localStorage.getItem("id")});
        // this.props.saveCustomerAddress({address: newAddress, id: localStorage.getItem("id")});
    }


    canceleditaddresschanges = e => {
        e.preventDefault();
        this.fetchprofiledbcall();
    };


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
        if (this.state.showaddaddress === true) {
            var addaddressvar = (
                <div aria-labelledby="addadderessid">
                    <div className="address1" id="addaddressid">
                        <Card.Title>
                            Add new address
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
                                    onClick={this.addAddressToList}
                                    className="btn btn-warning text-light"
                                    style={{ width: "30%" }}>
                                    Save address
                    </button>
                                <button  className="btn btn-dark text-light" style={{ width: "30%" }}>Cancel</button>
                            </center>
                        </Form>
                    </div>
                </div>
            );
        }
        var it1 = -1;
        const test2 = this.state.testaddress;
        console.log("test2 is", test2);
        const add_var = this.state.address.map((addressvalues, index) => {
            it1 = it1 + 1;
            var id1 = 0;
            return (
                <div classname="savedadd">
                    <Card.Header style={{ width: "100%" }}>
                        Your saved addresses
                            </Card.Header>
                    <Form.Text className="text-muted">
                        <i>Update or delete your address(es).</i>
                        <Row>
                            <Col>
                                <Typography variant="subtitle1" gutterBottom>
                                    {addressvalues.Street} <br />
                                   Apt {addressvalues.Apt} <br />

                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    {addressvalues.City}, {addressvalues.State}, {addressvalues.Zipcode}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {addressvalues.Country}
                                </Typography>
                            </Col>
                            <Col >
                                <div style={{ width: "100%" }}>
                                    <EditIcon onClick={this.editAddress(index)} style={{ float: 'right' }}></EditIcon>
                                    <DeleteForeverIcon onClick={this.deleteAddress(index)} style={{ float: 'right' }}></DeleteForeverIcon>
                                </div>
                            </Col>
                        </Row>
                    </Form.Text>
                </div>
            );
        });

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
                            <Card.Header>
                                Manage your addresses
                        </Card.Header>
                            <Form.Text className="text-muted">
                                <i>You can add multiple addresses.</i>
                            </Form.Text>

                            <div className="address1">
                                <div>
                                    <center>
                                        {savebutton}
                                    </center>
                                </div>
                                <Card.Body>
                                    {addaddressvar}
                                </Card.Body>
                            </div>
                        </Card.Body>
                        <div>{add_var}</div>
                        <Card.Body>
                            <div>
                                {addressedit}
                            </div>
                        </Card.Body>
                        <Card.Header style={{ width: "100%" }}>
                            Your current delivery address
                        </Card.Header>
                        <Form.Text className="text-muted">
                            <i>This is your default delivery address.</i>
                        </Form.Text>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    AddressData: state.customerProfile.Address
});

export default connect(mapStateToProps, {saveCustomerAddress, editCustomerAddress})(Address);