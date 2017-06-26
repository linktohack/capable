import React, { Component } from 'react';
import {
    Button,
    Alert
} from 'react-bootstrap';

class LogoutForm extends Component {
    render() {
        return (
            <form>
                <Button type="submit">
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