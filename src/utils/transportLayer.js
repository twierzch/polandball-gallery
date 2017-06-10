import { stringifyQuery } from './stringifyQuery';
import { NetworkError } from './errors';


export class TransportLayer {
    constructor( clientId ) {
        this.clientId = clientId;
    }

    fetch( url, config = {} ) {
        const { allowFail, ...conf } = config;

        return _fetch(
            url,
            this.clientId,
            conf
        ).then( resp => {
            if( resp.ok ) return resp.json()

            throw new NetworkError('Fetch failed', resp);
        }).catch( err => {
            // TODO: handle displaying error notification

            if( allowFail ) throw err;
            return null;
        });;
    }

    get( url, config = {} ) {
        return this.fetch(
            url,
            { method: 'GET', ...config }
        )
    }
}

function _fetch( url, clientId, { query = null, headers = {}, ...config } = {} ) {
    headers['Authorization'] = `Client-ID ${ clientId }`;

    if( query ) url += `?${ stringifyQuery( query )}`

    return fetch( url, { headers, ...config } )
}
