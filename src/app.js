import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import stateStore from 'src/stores/stateStore';
import { AppBarContainer } from 'src/containers/appBarContainer';
import { ClientIdModalContainer } from 'src/containers/clientIdModalContainer';
import { GalleryListContainer } from 'src/containers/galleryListContainer';
import { GalleryItemDetailsContainer } from 'src/containers/galleryItemDetailsContainer';

import 'css/style.css';


@observer
export class App extends Component {
    @computed
    get activeView() {
        switch (stateStore.viewName) {
            case 'gallery':
                return <GalleryListContainer key="gallery"/>
            case 'imageDetails':
                return <GalleryItemDetailsContainer key="imgDetails"/>
            default:
                return null
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBarContainer />
                    <div className="gallery-container">
                        {this.activeView}
                    </div>
                    <ClientIdModalContainer />
                </div>
            </MuiThemeProvider>
        )
    }
}
