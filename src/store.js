import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import u from 'updeep';

import Api from './Api';

const store = new BehaviorSubject({
    token: undefined,
    hosts: [],
    selectedHost: undefined,
    libraries: [],
    selectedLibrary: undefined,    
})

store.next(u({token: Api.plex.token()}), store.getValue())

export default store;