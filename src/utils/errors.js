export class NetworkError extends Error {
    constructor( msg, resp ) {
        super( msg );

        this.name = 'NetworkError';
        this.response = resp;
    }
}
