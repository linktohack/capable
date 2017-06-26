import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import LoginForm from './LoginForm';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col lg={3}>
            <LoginForm />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;