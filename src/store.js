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


export default store;