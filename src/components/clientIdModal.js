import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import autobind from 'autobind-decorator';


export class ClientIdModal extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            clientIdInput: '',
        };
    }

    @autobind
    onSaveBtnClick() {
        this.props.onClientIdSave( this.state.clientIdInput );
    }

    @autobind
    handleClientIdChange( ev ) {
        this.setState({ clientIdInput: ev.target.value });
    }

    render() {

        const actions = [
            <RaisedButton
                label="Save"
                primary={true}
                disabled={!this.state.clientIdInput}
                onTouchTap={this.onSaveBtnClick}
            />
        ]

        return (
            <Dialog
                title="Enter Client-ID to use Imgur API"
                actions={actions}
                modal={true}
                open={this.props.open}
            >
                <TextField
                    value={this.state.clientIdInput}
                    onChange={this.handleClientIdChange}
                    floatingLabelText="Client ID"
                    fullWidth
                />
            </Dialog>
        )
    }
}
