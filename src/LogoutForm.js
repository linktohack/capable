import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

import Api from './Api';
import { setResourcesForToken } from './action';

import './LogoutForm.css';

class LogoutForm extends Component {
    constructor(props) {
        super(props);

        this.logout = this._logout.bind(this);

        this.state = {
            success: undefined,
            danger: undefined
        };
    }

    _logout(event) {
        event.preventDefault();

        Api.plex.logout();
        setResourcesForToken(null);
        this.setState({success: 'Loggout success'});
    }

    render() {
        return (
            <form className="logout-form">
                <Button type="submit" onClick={this.logout} bsStyle="primary" className="pull-right">
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