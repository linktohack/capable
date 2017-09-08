import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import 'rxjs/add/operator/map';

import store from './store';
import { setLibrariesForResource } from './action';

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
        setLibrariesForResource(url);
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
                            <img width={64} height={64} src="https://via.placeholder.com/64x64" alt={it.name}/>
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