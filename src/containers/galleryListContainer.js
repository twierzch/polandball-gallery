import React, { Component } from 'react';
import { observer } from 'mobx-react';

import galleryStore from 'src/stores/galleryStore';
import router from 'src/router';
import { GalleryList } from 'src/components/galleryList';


@observer
export class GalleryListContainer extends Component {
    handleItemClick( imageId ) {
        router.navigate(
            router.generate('imageDetails', { imageId } )
        )
    }

    render() {
        return (
            <GalleryList
                onFetchMore={galleryStore.fetchNextPage}
                onItemClick={this.handleItemClick}
                items = {galleryStore.gallery ? galleryStore.gallery.values() : []}
            />
        )
    }
}
