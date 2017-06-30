import React, {Component} from "react";
import {Alert, Button} from "react-bootstrap";

import Api from "./Api";

class LogoutForm extends Component {
    constructor(props) {
        super(props);

        this.logout = this._logout.bind(this);
    }

    _logout() {
        Api.plex.logout()
    }

    render() {
        return (
            <form>
                <Button type="submit" onClick={this.logout}>
                    Log out
                </Button>

                <Alert bsStyle="success">
                    <strong>Login success</strong> Token is Token
                </Alert>

                <Alert bsStyle="danger">
                    <strong>Login failed</strong> Token is Token
                </Alert>
            </form>
        );
    }
}

export default LogoutForm;