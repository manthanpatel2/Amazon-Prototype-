import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    componentWillReceiveProps(props) {
        console.log("props", props.CommentsRef);
        if (props.CommentsRef) {

            this.setState({
                count: props.CommentsRef.length
            })
        }

    }
    render() {
        return (
            <div style={{ width: "100%" }}>
                <Card>
                    <Card.Header>
                        Comment Count:
                    </Card.Header>
                    <Card.Title>

                    </Card.Title>
                    <Card.Body>
                        Reviews Given: {this.state.count}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({

    CommentsRef: state.customerProfile.CommentsRef
});
export default connect(mapStateToProps, {})(Comment);