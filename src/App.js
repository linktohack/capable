import React, {Component} from "react";
import {Col, Grid, Row} from "react-bootstrap";
import ResourcesList from "./ResourcesList";

import u from "updeep";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";
import "rxjs/add/operator/distinctUntilChanged";

import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";

import Api from "./Api";
import store from "./store";

store.next(u({token: Api.plex.token()}, store.value));

store.map(it => it.token)
    .distinctUntilChanged()
    .subscribe(token => {
        if (!token) {
            return
        }

        Api.plex.resources()
            .map(it => it.MediaContainer.Device
                .filter(it => it.$.provides === 'server')
                .map(it => {
                    const conn = it.Connection.find(it => it.$.local === "0");
                    return {
                        name: it.$.name,
                        url: conn.$.uri
                    }
                }))
            .do(it => console.log('resources', it))
            .subscribe(resources => {
                store.next(u({resources: resources}, store.value));
            });
    });

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
                    <Col xs={3}>
                        { this.state.token
                            ? (
                                <Row>
                                    <Col>
                                        <LogoutForm />
                                    </Col>
                                </Row>
                            )
                            : (<Row>
                                    <Col>
                                        <LoginForm />
                                    </Col>
                                </Row>
                            )
                        }
                    </Col>
                    <Col xs={3}>
                        <ResourcesList/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;