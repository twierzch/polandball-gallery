import { action, observable } from 'mobx';


export class CommentModel {
    id = null;
    comment = null;
    author = null;
    author_id = null;
    ups = 0;
    downs = 0;
    points = 0;
    datetime = null;
    children = [];

    constructor( image, data ) {
        this.image = image;
        this.setData( data );
    }

    setData( data ) {
        _commentProps.forEach( key => {
            if( data[key] === undefined ) return;

            this[key] = data[key];
        })

        if( data.datetime ) this.datetime = new Date( data.datetime * 1000 );
        if( data.comments ) this.comments = data.comments.map( c => new CommentModel( this.image, c))
    }
}

const _commentProps = [
    'id',
    'comment',
    'author',
    'author_id',
    'ups',
    'downs',
    'points',
];
