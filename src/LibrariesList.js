import React, {Component} from "react";
import {Media} from "react-bootstrap";
import "rxjs/add/operator/map";

import u from "updeep";

import store from "./store";

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
        store.next(u({selectedLibrary: url}, store.value));
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
            <div className="list-libraries">
                {this.state.libraries.map(it => (
                    <Media onClick={this.selectLibrary} key={it.url} data-url={it.url}>
                        <Media.Left align="top">
                            <img width={64} height={64} src={it.thumb} alt={it.name}/>
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

export default LibrariesList;