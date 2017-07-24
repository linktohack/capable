import React, {Component} from "react";
import {Media} from "react-bootstrap";

import {List} from 'react-virtualized';

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
        this.rowRenderer = this._rowRenderer.bind(this);
    }

    componentDidMount() {
        this.composite = store.map(it => it.libraries).subscribe(libraries => {
            this.setState({libraries});
        });
    }

    componentWillUnmount() {
        this.composite.unsubscribe();
    }

    _selectLibrary(event) {
        const url = event.currentTarget.getAttribute('data-url');
        store.next(u({selectedLibrary: url}, store.value));
    }

    _rowRenderer({key, index, style}) {
        const it = this.state.libraries[index];
        return (
            <Media onClick={this.selectLibrary} key={it.url} data-url={it.url}>
                <Media.Left align="top">
                    <img width={64} height={64} src={it.thumb} alt={it.name}/>
                </Media.Left>
                <Media.Body>
                    <Media.Heading>{it.name}</Media.Heading>
                    <p>{it.url}</p>
                </Media.Body>
            </Media>
        );
    }

    render() {
        console.log('props', this.props);
        return (
            <List
                height={this.props.height}
                rowCount={this.state.libraries.length}
                rowHeight={64}
                rowRenderer={this.rowRenderer.bind(this)}
                width={this.props.width}
            />
        );
    }
}

export default LibrariesList;