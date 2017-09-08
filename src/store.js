import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const store = new BehaviorSubject({
    token: undefined,
    resources: [],
    selectedResource: undefined,
    libraries: [],
    selectedLibrary: undefined,
    tracks: {},
    info: {},
    error: {}
});

export default store;