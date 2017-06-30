import React, {Component} from "react";
import {Media} from "react-bootstrap";
import "rxjs/add/operator/map";

import u from "updeep";

import store from "./store";

class TracksList extends Component {
    composite = undefined;

    constructor(props) {
        super(props);

        this.state = {
            tracks: {}
        };

        this.selectTrack = this._selectTrack.bind(this);
    }

    _selectTrack(event) {
        const url = event.currentTarget.getAttribute('data-url');
        store.next(u({selectedSubtitle: url}, store.value));
    }

    componentDidMount() {
        this.composite = store.map(it => it.tracks).subscribe(tracks => {
            this.setState({tracks});
        });
    }

    componentWillUnmount() {
        this.composite.unsubscribe();
    }

    render() {
        return (
            <div>
                {this.state.tracks.video && (
                    <Media >
                        <Media.Left align="top">
                            <img width={64} height={64} src="http://lorempixel.com/256/256"
                                 alt={this.state.tracks.video.url}/>
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{this.state.tracks.video.url}</Media.Heading>
                            <p>{this.state.tracks.video.url}</p>
                        </Media.Body>
                    </Media>
                )}

                {(this.state.tracks.subtitles || []).map(it => (
                    <Media onClick={this.selectTrack} key={it.url} data-url={it.url}>
                        <Media.Left align="top">
                            <img width={64} height={64} src="http://lorempixel.com/256/256" alt={it.language}/>
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{it.language}</Media.Heading>
                            <p>{it.url}</p>
                        </Media.Body>
                    </Media>
                ))}
            </div>
        );
    }
}

export default TracksList;