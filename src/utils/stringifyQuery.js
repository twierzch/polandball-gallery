export function stringifyQuery( query ) {
    if( typeof query === 'string' || query == null ) return query;

    const queryParts = [];

    for( let key in query ) {
        if( !query.hasOwnProperty( key )) continue;

        queryParts.push(
            `${ encodeURIComponent( key )}=${ encodeURIComponent( query[key] )}`
        );
    }

    return queryParts.join('&');
}

export function destringifyQuery( query ) {
    if( !query || typeof query !== 'string' ) return query;

    const queryParts = query.split( '&' );

    return queryParts.reduce( decodeQueryParts, {} );
}

function decodeQueryParts(acc, queryParts) {
    const [ key, val ] = queryParts.split( '=' ).map( decodeURIComponent );

    return Object.assign( acc, { [key]: val } )
}
