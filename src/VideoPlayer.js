import React, {Component} from "react";

import store from "./store";

class VideoPlayer extends Component {
    composite = undefined;

    constructor(props) {
        super(props);
        this.state = {track: {}};
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
                {this.state.tracks && this.state.tracks.video && (
                    <video width={640} height={360}
                           key={this.state.tracks.video.url}
                           controls preload="metadata"
                           crossOrigin="anonymous"
                           poster={this.state.tracks.video.poster}>
                        <source src={this.state.tracks.video.url}/>
                        {this.state.tracks.subtitles.map(subtitle => (
                            <track key={subtitle.url}
                                   label={subtitle.language}
                                   kind="subtitles"
                                   srcLang={subtitle.languageCode}
                                   src={subtitle.url + '&type=.srt'}/>
                        ))}
                    </video>
                )}
            </div>
        )
    }
}

export default VideoPlayer