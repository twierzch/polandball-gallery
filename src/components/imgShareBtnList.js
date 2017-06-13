import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import Paper from 'material-ui/Paper';
import { ShareButtons, generateShareIcon } from 'react-share';


@observer
export class ImgShareBtnList extends Component {
    @computed
    get btns() {
        const { item } = this.props;

        if( !item ) return null;

        return shareOptions.map( config => {
            return (
                <div key={config.key} className="share-item__btn-container">
                    <config.btn
                        url={item.link}
                        className="share-item__share-btn"
                    >
                        <config.icon
                            size={50}
                            round
                        />
                    </config.btn>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="gallery-item-details__share-btns">
                <Paper zDepth={2} className="paper">
                    <div className="share-item__share-btns-container">
                        {this.btns}
                    </div>
                </Paper>
            </div>
        )
    }
}

const shareOptions = [
    { key: 'fb', icon: generateShareIcon('facebook'), btn: ShareButtons.FacebookShareButton },
    { key: 'tw', icon: generateShareIcon('twitter'), btn: ShareButtons.GooglePlusShareButton },
    { key: 'go', icon: generateShareIcon('google'), btn: ShareButtons.LinkedinShareButton },
    { key: 'li', icon: generateShareIcon('linkedin'), btn: ShareButtons.TwitterShareButton }
];
