import React, { Component } from 'react';
import {
    Grid,
    Navbar,
    Jumbotron,
    Button, FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Checkbox,
    Radio,
    Alert,
} from 'react-bootstrap';

class LoginForm extends Component {
    render() {
        function FieldGroup({ id, label, help, ...props }) {
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
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter email" />
                <FieldGroup
                    id="formControlsPassword"
                    label="Password"
                    type="password" />

                <Button type="submit">
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