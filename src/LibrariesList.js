import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import 'rxjs/add/operator/map';
import { setTrackForSelectedLibrary } from './action';

import store from './store';

import './LibrariesList.css';

class LibrariesList extends Component {
    composite = undefined;

    constructor(props) {
        super(props);

        this.state = {
            libraries: []
        };

        this.selectLibrary = this._selectLibrary.bind(this);
    }

    _selectLibrary(event) {
        const url = event.currentTarget.getAttribute('data-url');
        setTrackForSelectedLibrary(url);
    }

    componentDidMount() {
        this.composite = store.map(it => it.libraries).subscribe(libraries => {
            this.setState({libraries});
        });
    }

    componentWillUnmount() {
        this.composite.unsubscribe();
    }

    render() {
        return (
            <div className="libraries-list">
                {this.state.libraries.map(it => (
                    <Media onClick={this.selectLibrary} key={it.url} data-url={it.url}>
                        <Media.Left align="top">
                            <img width={64} height={64} src={it.thumb} alt={it.title}/>
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{`${it.title} (${it.year})`}</Media.Heading>
                            <p>{it.summary}</p>
                        </Media.Body>
                    </Media>
                ))}
            </div>
        );
    }
}

export default LibrariesList;