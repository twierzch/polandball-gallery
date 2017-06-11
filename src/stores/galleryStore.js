import { action, computed, reaction, observable } from 'mobx';

import stateStore from './stateStore'
import { TransportLayer } from 'src/utils/transportLayer'
import { GalleryItemFactory } from 'src/models/galleryItemModels';


export class GalleryStore {
    @observable.ref gallery = null;

    constructor( transportLayer ) {
        this.trasnportLayer = transportLayer;

        this.initizalizeReactions();
    }

    setTransportLayerClientId() {
        this.trasnportLayer.setClientId( stateStore.clientId );
    }

    @action
    fetchGallery() {
        if( !this.gallery ) this.gallery = observable.shallowMap({})

        this.trasnportLayer.get(
            ...this._getFetchParams()
        ).then( resp => {
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
        }).then( () => console.log(this.gallery.values()));
    }

    initizalizeReactions() {
        this._galleryFetchReaction = reaction(
            () => stateStore.clientId,
            () => {
                this.setTransportLayerClientId();
                this.fetchGallery();
            }
        )
    }

    _getFetchParams() {
        const sort = 'time';
        const page = 0;

        const url = `https://api.imgur.com/3/gallery/search/${sort}/${page}`;
        const query = {
            'q': 'polandball'
        }

        return [ url,  { query } ];
    }
}

const galleryStore = new GalleryStore( new TransportLayer() );
export default galleryStore;
