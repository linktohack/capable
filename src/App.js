import React, {Component} from "react";
import {Col, Grid, Row} from "react-bootstrap";

import u from "updeep";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";
import "rxjs/add/operator/distinctUntilChanged";

import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";
import ResourcesList from "./ResourcesList";
import LibrariesList from "./LibrariesList";

import Api from "./Api";
import store from "./store";
import VideoPlayer from "./VideoPlayer";

store.subscribe(it => console.log('store', it));

store.next(u({token: Api.plex.token()}, store.value));

class App extends Component {
    composite = undefined;

    constructor(props) {
        super(props);
        this.state = {token: undefined}
    }

    componentDidMount() {
        this.composite = store.map(it => it.token).subscribe(
            token => {
                this.setState({token: token});
            }
        )
    }

    componentWillUnmount() {
        this.composite.unsubscribe();
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={3}>
                        {this.state.token && (
                            <Row>
                                <Col md={12}>
                                    <LogoutForm/>
                                </Col>
                            </Row>
                        ) || (<Row>
                                <Col md={12}>
                                    <LoginForm/>
                                </Col>
                            </Row>
                        )}
                        <Row>
                            <Col md={12}>
                                <ResourcesList/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <LibrariesList/>
                    </Col>
                    <Col md={6}>
                        <VideoPlayer/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;