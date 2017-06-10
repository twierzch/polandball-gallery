import fetchMock from 'fetch-mock'

import { TransportLayer } from 'src/utils/transportLayer'


describe('test TransportLayer ', function() {
    before(function() {
        fetchMock.get('/success', { success: true });
        fetchMock.get('/fail', { throws: { success: false } })
        fetchMock.get('/bad', { status: 404, body: { success: false } })
    });

    after( fetchMock.restore );

    it('initalize with clientId', function(){
        const tl = new TransportLayer(123);

        expect( tl.clientId ).to.eq( 123 );
    });

    it('fetch data from server', function( done ) {
        const tl = new TransportLayer( 123 );

        tl.get( '/success' ).then( resp => {
            expect( resp ).to.deep.equal({ success: true });
            done();
        }).catch( err => done( err ));
    });

    it('adds Authorization to header', function( done ) {
        const tl = new TransportLayer( 123 );

        tl.get( '/success' ).then( () => {
            const request = fetchMock.lastCall()[1]

            expect( request.headers ).to.include({ 'Authorization': 'Client-ID 123' });
            done();
        }).catch( err => done( err ));
    })

    it('return null on bad response', function( done ) {
        const tl = new TransportLayer( 123 );

         tl.get( '/fail' ).then( err => {
             expect( err ).to.be.null;
             done();
         }).catch( err => done( err ));
    })

    it('fail when allowFail set to true', function( done ) {
        const tl = new TransportLayer( 123 );

         tl.get( '/fail', { allowFail: true } ).then( resp => {
             done( resp );
         }, err => {
             expect( err ).to.deep.equal({ success: false });
             done();
         }).catch( err => {
             done();
         });
    })

    it('throws on bad request', function( done ){
        const tl = new TransportLayer( 123 );

        tl.get( '/bad', { allowFail: true } ).then( resp => {
            done( resp );
        }, err => {
            expect( err.name ).to.eq( 'NetworkError' );
            done();
        })
    })
});
