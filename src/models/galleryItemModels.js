import { action, observable } from 'mobx';


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
    @observable imgs = [];
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
    setImgLinks( imgLinks ) {
        this.imgs = imgLinks;
    }

    getCommentsUrl() {
        return `https://api.imgur.com/3/gallery/${this.id}/images`;
    }
}

export class ImageModel extends GaleryItemModel {
    isAlbum = false;

    constructor( store, data ) {
        super( store, data );

        this.setImgLinks([ this.link ])
    }

    getImagesUrls() {
        return Promise.resolve([ this.imgs ])
    }

    getCoverImgUrl() {
        return this.link;
    }
}

export class AlbumModel extends GaleryItemModel {
    isAlbum = true;

    getImagesUrls() {
        const imgUrl = `https://api.imgur.com/3/album/${this.id}/images`;

        return this.store.trasnportLayer.get( imgUrl ).then( resp => {
            this.setImgLinks( resp.data.map( img => img.link ));
            return this.imgs;
        })
    }

    getCoverImgUrl() {
        return `http://i.imgur.com/${this.cover}.png`;
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
    'link',
    'cover'
];
