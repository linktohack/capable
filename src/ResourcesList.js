import React, {Component} from "react";
import {Media} from "react-bootstrap";
import "rxjs/add/operator/map";

import u from "updeep";

import store from "./store";

import './ResourcesList.css';

class ResourcesList extends Component {
    composite = undefined;

    constructor(props) {
        super(props);

        this.state = {
            resources: []
        };

        this.selectResource = this._selectResource.bind(this);
    }

    _selectResource(event) {
        const url = event.currentTarget.getAttribute('data-url');
        store.next(u({selectedResource: url}, store.value));
    }

    componentDidMount() {
        this.composite = store.map(it => it.resources).subscribe(resources => {
            this.setState({resources});
        });
    }

    componentWillUnmount() {
        this.composite.unsubscribe();
    }

    render() {
        return (
            <div className="resources-list">
                {this.state.resources.map(it => (
                    <Media onClick={this.selectResource} key={it.url} data-url={it.url}>
                        <Media.Left align="top">
                            <img width={64} height={64} src="http://lorempixel.com/256/256" alt={it.name}/>
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{it.name}</Media.Heading>
                            <p>{it.url}</p>
                        </Media.Body>
                    </Media>
                ))}
            </div>
        );
    }
}

export default ResourcesList;