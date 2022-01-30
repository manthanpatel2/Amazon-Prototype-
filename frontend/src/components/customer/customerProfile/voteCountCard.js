import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

class Votecount extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        Insights
                        </Card.Header>
                    <Card.Body>
                        <center>
                            <table>
                                <tbody>
                                    <th>
                                        <tr>
                                            <td>
                                                <Card.Title>
                                                    Votes
                                </Card.Title>
                                            </td>
                                            <div className="insight-spacing"></div>
                                            <td>
                                                <Card.Title>
                                                    Comments
                                </Card.Title>
                                            </td>
                                        </tr>
                                    </th>
                                </tbody>
                            </table>
                        </center>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Votecount;