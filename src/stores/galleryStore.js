import { action, computed, reaction, observable } from 'mobx';

import stateStore from './stateStore'
import { TransportLayer } from 'src/utils/transportLayer'
import { GalleryItemFactory } from 'src/models/galleryItemModels';
import { CommentModel } from 'src/models/commentModel';


export class GalleryStore {
    @observable.ref gallery = null;
    @observable page = 0

    constructor( transportLayer ) {
        this.trasnportLayer = transportLayer;

        this.initizalizeReactions();
    }

    setTransportLayerClientId() {
        this.trasnportLayer.setClientId( stateStore.clientId );
    }

    @action.bound
    fetchNextPage() {
        this.page += 1;
        return this.fetchGallery( false );
    }

    @action
    fetchGallery( clearGallery = true) {
        if( !this.gallery ) this.gallery = observable.shallowMap({})

        if( clearGallery ) {
            this.gallery.clear();
            this.page = 0;
        }

        return this.trasnportLayer.get(
            ...this._getFetchParams()
        ).then( action(resp => {
            resp.data.forEach( item => {
                if( this.gallery.has( item.id )) {
                    this.gallery.get( item.id ).setData( item );
                } else {
                    this.gallery.set(
                        item.id,
                        GalleryItemFactory.create( this, item )
                    );
                }
            });
        }))
    }

    @action
    fetchItem( itemOrItemId ) {
        if( itemOrItemId == null ) return;
        if( !this.gallery ) this.gallery = observable.shallowMap({});

        const id = itemOrItemId.id || itemOrItemId;
        const isAlbum = this.gallery.has( id ) ? this.gallery.get( id ).isAlbum : null;

        this.page = 0;
        this.gallery.clear();

        let itemPromise = null;
        if( isAlbum === null ) {
            // TODO: this is bad, should store isAlbum in url and fallback to this only when necessary
            itemPromise = Promise.all([
                this.trasnportLayer.get(`https://api.imgur.com/3/gallery/album/${id}`),
                this.trasnportLayer.get(`https://api.imgur.com/3/gallery/image/${id}`)
            ]).then( resps => {
                const resp = resps.find( resp => resp );
                if( !resp ) return null;

                const item = GalleryItemFactory.create( this, resp.data )

                this.gallery.set( item.id, item );

                return item;
            });
        } else {
            itemPromise = (
                isAlbum
                ? this.trasnportLayer.get(`https://api.imgur.com/3/gallery/album/${id}`)
                : this.trasnportLayer.get(`https://api.imgur.com/3/gallery/image/${id}`)
            ).then( resp => {
                if( !resp ) return null;

                const item = GalleryItemFactory.create( this, resp.data )

                this.gallery.set( item.id, item );

                return item;
            });
        }

        itemPromise.then( item => {
            if( !item ) return null;

            return Promise.all([
                item.getImagesUrls(),
                this._fetchItemComments( item )
            ]);
        })
    }

    @action
    _fetchItemComments( itemOrItemId ) {
        if( !this.gallery ) return Promise.resolve();

        const id = itemOrItemId.id || itemOrItemId;
        const item = this.gallery.get( id );

        if( !item || !item.comment_count ) return Promise.resolve();

        return this.trasnportLayer.get(
            item.getCommentsUrl()
        ).then( resp => {
            item.comments = resp.data.map(
                c => new CommentModel( this, c )
            );
        });
    }

    initizalizeReactions() {
        this._galleryFetchReaction = reaction(
            () => {
                return {
                    clientId: stateStore.clientId,
                    imageId: stateStore.imageId
                }
            },
            ({ clientId, imageId }) => {
                this.setTransportLayerClientId();

                if( imageId ) this.fetchItem( imageId );
                else this.fetchGallery();
            },
            true
        )
    }

    _getFetchParams() {
        const sort = 'time';

        const url = `https://api.imgur.com/3/gallery/search/${sort}/${this.page}`;
        const query = {
            'q': 'polandball'
        }

        return [ url,  { query } ];
    }
}

const galleryStore = new GalleryStore( new TransportLayer() );
export default galleryStore;
