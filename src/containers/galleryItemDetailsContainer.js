import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

import galleryStore from 'src/stores/galleryStore';
import stateStore from 'src/stores/stateStore';
import { GalleryItemDetails } from 'src/components/galleryItemDetails';


@observer
export class GalleryItemDetailsContainer extends Component {
    @computed
    get item() {
        return galleryStore.gallery ? galleryStore.gallery.get( stateStore.imageId )
            : null;
    }

    render() {
        return (
            <GalleryItemDetails item={this.item} />
        )
    }
}
