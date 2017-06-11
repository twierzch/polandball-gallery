import { action, observable } from 'mobx';

import { CommentModel } from 'src/models/commentModel';


export class GalleryItemFactory {
    static create( store, item ) {
        return item.is_album
            ? new AlbumModel( store, item )
            : new ImageModel( store, item );
    }
}

export class GaleryItemModel {
    id = null;
    title = null;
    description = null;
    datetime = null;
    @observable views = 0;
    account_url = null;
    account_id = null;
    @observable ups = 0;
    @observable downs = 0;
    @observable points = 0;
    @observable comment_count = 0;
    @observable comments = [];
    link = null;

    constructor( store, data ) {
        this.store = store;
        this.setData( data);
    }

    @action
    setData( data ) {
        _galleryItemProps.forEach( key => {
            if( data[key] === undefined ) return;

            this[key] = data[key];
        })

        if( data.datetime ) this.datetime = new Date( data.datetime * 1000 );
    }

    @action
    fetchComments() {
        if( !this.comment_count ) return Promise.resolve();

        const commentsUrl = `https://api.imgur.com/3/gallery/${this.id}/images`

        return this.store.trasnportLayer.get( commentsUrl ).then( resp => {
            this.comments = resp.data.map( c => new CommentModel( this, c ));
        });
    }
}

export class ImageModel extends GaleryItemModel {
    getImagesUrls() {
        return Promise.resolve([ this.link ])
    }

    getCoverImgUrl() {
        return this.link;
    }
}

export class AlbumModel extends GaleryItemModel {
    getImagesUrls() {
        const imgUrl = `https://api.imgur.com/3/album/${this.id}/images`;

        return this.store.transportLayer.get( imgUrl ).then( resp => {
            return resp.data.map( img => img.link );
        })
    }

    getCoverImgUrl() {
        return this.link;
    }
}

const _galleryItemProps = [
    'id',
    'title',
    'description',
    'vies',
    'account_url',
    'account_id',
    'ups',
    'downs',
    'points',
    'comment_count',
    'link'
];
