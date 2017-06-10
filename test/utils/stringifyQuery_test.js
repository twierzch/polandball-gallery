import { stringifyQuery } from 'src/utils/stringifyQuery';


describe('Test stringifyQuery', function() {
    it('returns the same string ', function() {
        expect(stringifyQuery( 'test' )).to.eq( 'test' );
    })

    it('return encoded query from obj', function() {
        const query = {
            a: 'a',
            b: 'b b',
        }

        expect(stringifyQuery( query )).to.eq( 'a=a&b=b%20b' );
    } )
})
