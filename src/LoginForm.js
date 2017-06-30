import React, {Component} from "react";
import {Alert, Button, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

import "rxjs/add/operator/map";
import u from "updeep";

import Api from "./Api";
import store from "./store";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.handleEmailChange = this._handleEmailChange.bind(this);
        this.handlePasswordChange = this._handlePasswordChange.bind(this);
        this.login = this._login.bind(this);
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
                    store.next(u({token: token}, store.value));
                    Api.plex.token(token);
                },
                it => console.error(it)
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
            <form>
                <FieldGroup
                    onChange={this.handleEmailChange}
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter email"/>
                <FieldGroup
                    onChange={this.handlePasswordChange}
                    id="formControlsPassword"
                    label="Password"
                    type="password"/>

                <Button type="submit" onClick={this.login}>
                    Submit
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

export default LoginForm;