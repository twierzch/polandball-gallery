import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import stateStore from '../stores/stateStore';
import { ClientIdModal } from 'src/components/clientIdModal';


@observer
export class ClientIdModalContainer extends Component {
    @autobind
    handleCliendIdSave( clientId ) {
        stateStore.setClientId( clientId )
    }

    render() {
        return (
            <ClientIdModal
                open={!stateStore.clientId}
                onClientIdSave={this.handleCliendIdSave}
            />
        )
    }
}
