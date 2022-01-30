import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import { Dropdown } from 'react-bootstrap';
import './inventory.css';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
import { backendURL } from '../../../config';
import { Redirect } from 'react-router-dom';

class AdminInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            categoryName: "",
            categorySet: [],
            value: "",
            submitted: false,
            currentCategory: null,
            currentIndex: "-1"

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleNewCategory = this.handleNewCategory.bind(this);
        this.setActiveCategory = this.setActiveCategory.bind(this);
        // this.handlegetProducts = this.handlegetProducts.bind(this);
    }

    componentDidMount() {
        console.log("Component did mount called. axios call should go")
        Axios.get(backendURL + "/admin/category/getCategory")
            .then(response => {
                console.log(" Getting categories: ", response.data)
                if (response.status === 200) {
                    console.log("printing categories: ", response.data[0]["Categories"])
                    this.setState({
                        categorySet: response.data[0]["Categories"]
                    })
                }
            })
            .catch(err => {
                console.log("Error while getting categories is: ", err)
            })
        Axios.post(backendURL + "/admin/category/getProducts")
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    this.setState({
                        sellers: response.data
                    })
                }
            })
    }

    setActiveCategory(category, index) {
        this.setState({
            currentCategory: category,
            currentIndex: index
        }, () => {
            console.log("Active category is: ", this.state.currentCategory)
        })
    }

    handleChange(e) {
        this.setState(
            {
                categoryName: e.target.value
            }
        );
    }

    handleAdd(e) {

        e.preventDefault();
        var data = {
            Category: this.state.categoryName
        };
        Axios
            .post(backendURL + "/admin/category/addCategory", data)
            .then(response => {
                if (response.status === 200) {
                    // this.setState({
                    //     //id: response.data.id,
                    //     submitted: true
                    // });
                    // console.log(response.data);
                    Axios.get(backendURL + "/admin/category/getCategory")
                        .then(response => {
                            if (response.status === 200) {
                                this.setState({
                                    categorySet: response.data[0]["Categories"]
                                })
                            }
                        })
                }
            })
            .catch(e => {
                console.log(e);
            })
        alert('You have added category ' + this.state.categoryName + ' successfully!! ');
    }

    handleNewCategory(e) {
        this.setState({
            id: null,
            categoryName: "",
            submitted: false,
            categorySet: [],
            currentCategory: null,
            currentIndex: -1,
        })
    }

    handleRemove(e) {
        alert('You are going to remove ' + this.state.currentCategory);
        e.preventDefault();
        const data = {
            Category: this.state.currentCategory
        }

        Axios
            .post(backendURL + "/admin/category/removeCategory", data)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    //  alert("Category removed")
                    Axios.get(backendURL + "/admin/category/getCategory")
                        .then(response => {
                            if (response.status === 200) {
                                this.setState({
                                    categorySet: response.data[0]["Categories"]
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {

        return (
            <div>
                <div class="container">
                    <div className="row">
                        <div className="col-md-12"  >
                            <div className="form-inline my-2 my-lg-1" style={{ marginLeft: "17%" }}>

                                <form onSubmit={this.handleAdd}>
                                    <div className="form-group">
                                        <input class="form-control mr-sm-2" type="text" placeholder="Search" onChange={this.handleChange} value={this.state.categoryName} />
                                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Add Category</button>
                                    </div>
                                </form>
                                <div className="br"></div>

                                <form onSubmit={this.handleRemove}>

                                    <div className="form-group">
                                        <Select className="ui search dropdown" style={{ width: "13pc" }}>

                                            <value>
                                                {this.state.categorySet && this.state.categorySet.map((category, index) =>
                                                    (<li className={"list-group-item" + (index === this.state.currentIndex ? "active" : "")}
                                                        onClick={() => this.setActiveCategory(category, index)} key={index}>
                                                        {category}
                                                    </li>))}
                                            </value>
                                        </Select>

                                        <div className="spacing_inv"></div>
                                        <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">Remove Category</button>
                                    </div>
                                </form>
                                <hr />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminInventory;

{/*   <div className="form-group">
                    <Select className="ui search dropdown" style={{ width: "13pc" }} value={this.state.value} onChange={this.handleChange}>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                    </Select>
                    <div className="spacing_inv"></div>
                        <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">Remove Category</button>
                        </div>
                      */}
{/**   <ul className="col-md-6">
                      
                        { this.state.categorySet && this.state.categorySet.map((category,index)=>
                        (
                        <li className={"list-group-item" + (index === this.state.currentIndex ? "active": "")} 
                            onClick={()=>this.setActiveCategory(category, index)} 
                            key={index}>
                            {category}
                        </li>
                        ))}

                      </ul>
                      <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">Remove Category</button>
                     
                </form>*/}