import {Observable} from "rxjs/Observable";

import {parseString} from "xml2js";

function parseXml(xml) {
    return Observable.create(s => {
        parseString(xml, (err, res) => {
            if (err) {
                return s.error(err);
            }
            s.next(res);
            s.complete();
        });
    });
}

export {parseXml};