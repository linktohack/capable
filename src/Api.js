import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import { parseXml } from './helper';

const Api = {
    plex: {
        token(_token) {
            if (_token) {
                localStorage.setItem('token', _token);
            }

            return localStorage.getItem('token');
        },

        login(_login, password) {
            const url = 'https://plex.tv/users/sign_in.json';

            const settings = {
                'crossDomain': true,
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'x-plex-product': 'a product',
                    'x-plex-version': 'a version',
                    'x-plex-client-identifier': 'a client'
                },
                'body': JSON.stringify({
                    user: {login: _login, password}
                })
            };

            return Observable.fromPromise(fetch(url, settings).then(it => it.json()));
        },

        logout() {
            localStorage.removeItem('token');
        },

        resources() {
            const url = 'https://plex.tv/pms/resources.xml?includeHttps=1';

            const settings = {
                'crossDomain': true,
                'method': 'GET',
                'headers': {
                    'x-plex-token': this.token()
                }
            };

            return Observable.fromPromise(fetch(url, settings).then(it => it.text()))
                .flatMap(it => parseXml(it));
        },

        libraries(baseUrl) {
            const url = `${baseUrl}/library/sections/1/all`;

            const settings = {
                'crossDomain': true,
                'method': 'GET',
                'headers': {
                    'x-plex-token': this.token()
                }
            };

            return Observable.fromPromise(fetch(url, settings).then(it => it.text()))
                .flatMap(it => parseXml(it));
        },

        metadata(url) {
            const settings = {
                'crossDomain': true,
                'method': 'GET',
                'headers': {
                    'x-plex-token': this.token()
                }
            };

            return Observable.fromPromise(fetch(url, settings).then(it => it.text()))
                .flatMap(it => parseXml(it));
        }
    }
};

export default Api;