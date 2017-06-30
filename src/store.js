import {BehaviorSubject} from "rxjs/BehaviorSubject";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";
import "rxjs/add/operator/distinctUntilChanged";

import u from "updeep";

import Api from "./Api";

const store = new BehaviorSubject({
    token: undefined,
    resources: [],
    selectedResource: undefined,
    libraries: [],
    selectedLibrary: undefined,
    tracks: {}
});

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
                })
            )
            .subscribe(resources => {
                store.next(u({resources}, store.value));
            });
    });

store.map(it => it.selectedResource)
    .distinctUntilChanged()
    .subscribe(selectedResource => {
        if (!selectedResource) {
            return
        }

        Api.plex.libraries(selectedResource)
            .map(it => it.MediaContainer.Video
                .map(it => {
                    return {
                        name: it.$.title,
                        thumb: `${store.value.selectedResource}${it.$.thumb}?X-Plex-Token=${store.value.token}`,
                        url: `${store.value.selectedResource}${it.$.key}`
                    }
                })
            )
            .subscribe(libraries => {
                store.next(u({libraries}, store.value));
            });
    });

store.map(it => it.selectedLibrary)
    .distinctUntilChanged()
    .subscribe(selectedLibrary => {
        if (!selectedLibrary) {
            return
        }

        Api.plex.metadata(selectedLibrary)
            .map(it => it.MediaContainer.Video[0].Media[0].Part[0])
            .map(it => {
                const video = {
                    url: `${store.value.selectedResource}${it.$.key}?X-Plex-Token=${store.value.token}`
                };
                const thumb = it.$.thumb;
                const poster = it.$.art;
                const srt = it.Stream
                    .filter(it => it.$.streamType === "3" && it.$.format === "srt")
                    .map(it => ({
                        format: 'srt',
                        language: it.$.language || 'Unknown',
                        languageCode: it.$.languageCode || 'Unknown',
                        url: `https://vtt.linktohack.com/srt?hash=${btoa(`${store.value.selectedResource}${it.$.key}?X-Plex-Token=${store.value.token}`)}`
                    }));
                const ass = it.Stream
                    .filter(it => it.$.streamType === "3" && it.$.format === "ass")
                    .map(it => ({
                        format: 'srt',
                        language: it.$.language || 'Unknown',
                        languageCode: it.$.languageCode || 'Unknown',
                        url: `https://vtt.linktohack.com/ass?hash=${btoa(`${store.value.selectedResource}${it.$.key}?X-Plex-Token=${store.value.token}`)}`
                    }));
                return {video, subtitles: [].concat(srt, ass), thumb, poster};
            })
            .do(it => console.log('track', it))
            .subscribe(tracks => {
                store.next(u({tracks: u.constant(tracks)}, store.value));
            });
    });

export default store;