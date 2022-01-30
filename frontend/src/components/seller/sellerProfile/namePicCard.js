import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import CreateIcon from '@material-ui/icons/Create';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import IconButton from '@material-ui/core/IconButton';
import Avatar from 'react-avatar';
import CardActions from '@material-ui/core/CardActions';
import '../sellerProfile/sellerProfile.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Axios from "axios";
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
import { updateSellerNamePic } from '../../../Redux/actions/seller/sellerProfileActions';



class NamePic extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            name: "",
            profileURL: "",
            profileImage: "",
            open: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.SubmitChange = this.SubmitChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleClose() {
        this.setState({
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }



    handleChangePic = (files) => {
        console.log(files[0]);
        this.setState({
            profileImage: files[0],
            open: false
        })
        this.props.updateSellerNamePic(localStorage.getItem("id"), this.state.name, files[0])
    };

    SubmitChange(e) {
        e.preventDefault();
        this.props.updateSellerNamePic(localStorage.getItem("id"), this.state.name, this.state.profileImage)
    };
    componentDidMount() {
        if (this.props.NamePicData) {
            this.setState({
                name: this.props.NamePicData.Name,
                profileURL: this.props.NamePicData.ProfileURL,
            });
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.NamePicData) {
            this.setState({
                name: nextProps.NamePicData.Name,
                profileURL: nextProps.NamePicData.ProfileURL,
            });
        }
    }

    render() {
        var redirectVar = null;
        /*
             if(!this.props.loginStateStore.result) {
               redirectVar = <Redirect to= "/customerLogin" />
           }
           */
        return (
            <div>
                <Card>
                    <div className="photo">
                        <Card.Img className="cover-photo1" variant="top" src={require('../../../images/amazonseller.png')} alt="amazonseller" />
                    </div>
                    <Card.Body>
                        <table>
                            <div className="class1">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="avatar">
                                                <Avatar size="200" round={true} color="grey" src={this.state.profileURL} alt="upload profile picture" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="cameraicon">

                                                <CardActions>
                                                    <IconButton style={{ width: 50 }}>
                                                        <CameraAltIcon label="profileURL" onClick={this.handleOpen} />
                                                    </IconButton>
                                                    <DropzoneDialog
                                                        open={this.state.open}
                                                        onSave={this.handleChangePic}
                                                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                                        showPreviews={true}
                                                        maxFileSize={5000000}
                                                        onClose={this.handleClose}
                                                    />
                                                </CardActions>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="inner-name">
                                                <div className="customername">
                                                    <Card.Title>
                                                        <input type="text" value={this.state.name} onChange={this.SubmitChange} />

                                                        <IconButton style={{ width: 50 }}>
                                                            <CreateIcon onClick={this.handleChange}></CreateIcon>
                                                        </IconButton>
                                                    </Card.Title>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </div>
                        </table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

/*
CreateNamePic.PropTyppes={
    namepic:PropTypes.object.isRequired
};
*/

const mapStateToProps = state => ({
    NamePicData: state.sellerProfile
});

export default connect(mapStateToProps, { updateSellerNamePic })(NamePic);