import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { ClientIdModalContainer } from './containers/clientIdModalContainer';

export class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <ClientIdModalContainer />
            </MuiThemeProvider>
        )
    }
}
