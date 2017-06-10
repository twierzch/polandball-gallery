export function stringifyQuery( query ) {
    if( typeof query === 'string' ) return query;

    const queryParts = [];

    for( let key in query ) {
        if( !query.hasOwnProperty( key )) continue;

        queryParts.push(
            `${ encodeURIComponent( key )}=${ encodeURIComponent( query[key] )}`
        );
    }

    return queryParts.join('&');
}
