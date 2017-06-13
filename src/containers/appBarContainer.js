import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppBar from 'material-ui/AppBar';

import router from 'src/router';


@observer
export class AppBarContainer extends Component {
    handleTitleTap() {
        router.navigate( router.generate( 'gallery' ));
    }

    render() {
        return (
            <AppBar
                style={{position: 'fixed', top:0}}
                title="Polandball galery" zDepth={2}
                showMenuIconButton={false}
                onTitleTouchTap={this.handleTitleTap}
            />
        )
    }
}
