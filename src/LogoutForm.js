import React, {Component} from "react";
import {Alert, Button} from "react-bootstrap";

import Api from "./Api";
import u from 'updeep';

import './LogoutForm.css';

class LogoutForm extends Component {
    constructor(props) {
        super(props);

        this.logout = this._logout.bind(this);

        this.state = {
            success: undefined,
            danger: undefined
        }
    }

    _logout() {
        Api.plex.logout();
        this.setState(u({success: 'Loggout success'}, this.state));
    }

    render() {
        return (
            <form className="logout-form">
                <Button type="submit" onClick={this.logout}>
                    Log out
                </Button>

                {this.state.success && (
                    <Alert bsStyle="success">
                        <strong>{this.state.success}</strong>
                    </Alert>
                )}

                {this.state.danger && (
                    <Alert bsStyle="danger">
                        <strong>{this.state.danger}</strong>
                    </Alert>
                )}
            </form>
        );
    }
}

export default LogoutForm;