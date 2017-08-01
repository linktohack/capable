import React, {Component} from "react";
import {Alert, Button, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

import "rxjs/add/operator/map";
import u from "updeep";

import Api from "./Api";
import store from "./store";

import './LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.handleEmailChange = this._handleEmailChange.bind(this);
        this.handlePasswordChange = this._handlePasswordChange.bind(this);
        this.login = this._login.bind(this);

        this.state = {
            success: undefined,
            danger: undefined
        }
    }

    _handleEmailChange(event) {
        this.email = event.target.value;
    }

    _handlePasswordChange(event) {
        this.password = event.target.value;
    }

    _login(event) {
        event.preventDefault();

        Api.plex.login(this.email, this.password)
            .map(it => it.user.authToken)
            .subscribe(token => {
                    this.setState(u({success: `Token is: ${token}`}));
                    Api.plex.token(token);
                    store.next(u({token: token}, store.value));
                },
                error => {
                    this.setState(u({danger: `Error is: ${error}`}));
                }
            )
    }

    render() {
        function FieldGroup({id, label, help, ...props}) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        }

        return (
            <form className="login-form">
                <FieldGroup
                    onChange={this.handleEmailChange}
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter your plex email"/>
                <FieldGroup
                    onChange={this.handlePasswordChange}
                    id="formControlsPassword"
                    label="Password"
                    type="password"
                    placeholder="Enter password"/>

                <Button type="submit" onClick={this.login} bsStyle="primary" className="pull-right">
                    Submit
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

export default LoginForm;