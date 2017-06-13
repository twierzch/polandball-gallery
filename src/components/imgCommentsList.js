import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Paper from 'material-ui/Paper';


@observer
export class ImgCommentsList extends Component {
    render() {
        return (
            <div className="gallery-item-details__comments">
                <Paper zDepth={2} className="paper" />
            </div>
        )
    }
}
