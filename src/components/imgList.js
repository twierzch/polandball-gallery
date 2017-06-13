import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import Paper from 'material-ui/Paper';


@observer
export class ImgList extends Component {
    @computed
    get imgs() {
        const { item } = this.props;

        if( !item ) return null;

        return item.imgs.map( i =>
            <img key={i} src={i} className="gallery-item-details__img" />
        )
    }

    render() {
        return (
            <div className="gallery-item-details__imgs">
                <Paper zDepth={2} className="paper" >
                    <div className="gallery-item-details__imgs-container">
                        {this.imgs}
                    </div>
                </Paper>
            </div>
        )
    }
}
