import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

import store from './store';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col lg={3}>
            <Row>
              <Col>
                <LoginForm />
              </Col>
            </Row>
            <Row>
              <Col>
                <LogoutForm />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;