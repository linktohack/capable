import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

const Api = {
    plex: {
        token(token) {
            if (token) {
                localStorage.setItem('token', token);
            }

            localStorage.getItem('token');
        },

        login(login, password) {
            const url = "https://plex.tv/users/sign_in.json";

            const settings = {
                "crossDomain": true,
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "x-plex-product": "a product",
                    "x-plex-version": "a version",
                    "x-plex-client-identifier": "a client"
                },
                "body": JSON.stringify({
                    user: { login, password }
                })
            };

            return Observable.fromPromise(fetch(url, settings).then(it => it.json()))
                .do(it => this.token(it.user.authToken));
        },

        logout() {
            localStorage.removeItem('token');
        }
    }
};

export default Api;