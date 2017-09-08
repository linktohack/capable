import store from './store';
import Api from './Api';
import u from 'updeep';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';

const setResourcesForToken = (token) => {
    if (!token) {
        const resources = [];
        store.next(u({token, resources}, store.value));
        return;
    }

    Api.plex.resources()
        .map(it => it.MediaContainer.Device
            .filter(it => it.$.provides === 'server')
            .map(it => {
                const conn = it.Connection.filter(it => it.$.local === '0')[0];
                return {
                    name: it.$.name,
                    url: conn.$.uri
                };
            })
        )
        .subscribe(resources => {
            store.next(u({token, resources}, store.value));
        });
};

const setLibrariesForResource = (selectedResource) => {
    if (!selectedResource) {
        const libraries = [];
        store.next(u({selectedResource, libraries}, store.value));
        return;
    }

    Api.plex.libraries(selectedResource)
        .map(it => it.MediaContainer.Video
            .map(it => {
                return u({
                    thumb: `${selectedResource}${it.$.thumb}?X-Plex-Token=${store.value.token}`,
                    url: `${selectedResource}${it.$.key}`
                }, it.$);
            })
        )
        .subscribe(libraries => {
            store.next(u({selectedResource, libraries}, store.value));
        });
};

const setTrackForSelectedLibrary = (selectedLibrary) => {
    if (!selectedLibrary) {
        const tracks = [];
        store.next(u({selectedLibrary, tracks}, store.value));
        return;
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
                .filter(it => it.$.streamType === '3' && it.$.format === 'srt')
                .map(it => ({
                    format: 'srt',
                    language: it.$.language || 'Unknown',
                    languageCode: it.$.languageCode || 'Unknown',
                    url: `https://vtt.linktohack.com/srt?hash=${btoa(`${store.value.selectedResource}${it.$.key}?X-Plex-Token=${store.value.token}`)}`
                }));
            const ass = it.Stream
                .filter(it => it.$.streamType === '3' && it.$.format === 'ass')
                .map(it => ({
                    format: 'srt',
                    language: it.$.language || 'Unknown',
                    languageCode: it.$.languageCode || 'Unknown',
                    url: `https://vtt.linktohack.com/ass?hash=${btoa(`${store.value.selectedResource}${it.$.key}?X-Plex-Token=${store.value.token}`)}`
                }));
            return {video, subtitles: [].concat(srt, ass), thumb, poster};
        })
        .subscribe(tracks => {
            store.next(u({selectedLibrary, tracks}, store.value));
        });
};

export { setResourcesForToken, setLibrariesForResource, setTrackForSelectedLibrary };