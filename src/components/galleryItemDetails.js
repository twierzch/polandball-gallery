import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { ImgList } from 'src/components/imgList';
import { ImgShareBtnList } from 'src/components/imgShareBtnList';
import { ImgCommentsList } from 'src/components/imgCommentsList';

@observer
export class GalleryItemDetails extends Component {
    render() {
        const { item } = this.props;

        return (
            <div className="gallery-item-details row">
                <div className="col col-60">
                    <div className="gallery-item-details__item-container">
                        <ImgList item={item} />
                    </div>
                </div>
                <div className="col col-40">
                    <div className="gallery-item-details__item-container">
                        <ImgShareBtnList item={item} />
                    </div>
                    <div className="gallery-item-details__item-container">
                        <ImgCommentsList item={item} />
                    </div>
                </div>
            </div>
        );
    }
}
