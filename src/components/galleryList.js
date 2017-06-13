import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Paper from 'material-ui/Paper';
import autobind from 'autobind-decorator';

import infiniteScroll from 'src/utils/infiniteScrollDecorator';


@infiniteScroll
@observer
export class GalleryList extends Component {
    getGalleryItems() {
        const { items, onItemClick } = this.props;

        return items.map( item => (
            <GalleryListItem
                key={item.id}
                item={item}
                onClick={onItemClick}
            />
        ));
    }

    render() {
        return (
            <div className="gallery-list">
                { this.getGalleryItems() }
            </div>
        );
    }
}

@observer
export class GalleryListItem extends Component {
    @autobind
    handleClick() {
        const { item, onClick } = this.props;

        onClick( item.id );
    }

    render() {
        const imgStyle = {
            backgroundImage: `url("${this.props.item.getCoverImgUrl()}")`
        }
        return (
            <div className="gallery-list-item">
                <Paper zDepth={2} style={paperStyle} >
                    <div
                        className="gallery-list-item__img"
                        style={imgStyle}
                    />
                    <div className="gallery-list-item_img-shadow"
                        onClick={this.handleClick}
                    >
                        <p>{this.props.item.title}</p>
                    </div>
                </Paper>
            </div>
        );
    }
}

const paperStyle = {
  height: '100%',
  width: '100%',
};
