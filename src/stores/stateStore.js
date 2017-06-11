import { action, observable } from 'mobx';

import { updateUrlOnStateChange } from 'src/router';
import { destringifyQuery, stringifyQuery } from 'src/utils/stringifyQuery';


export class StateStore {
    @observable viewName;
    @observable clientId;
    @observable imageId;

    @action
    updateStateOnUrlChange( viewName, params, query ) {
        this.viewName = viewName;

        switch ( this.viewName ) {
            case 'imageDetails':
                this.setImageId( params.imageId );
                break;
            case 'gallery':
                this.setImageId( null );
                break;
        }

        const queryObj = destringifyQuery( query );

        if( queryObj ) {
            this.setClientId( queryObj.clientId );
        }

        if( this.clientId && !queryObj.clientId ) {
            updateUrlOnStateChange();
        }
    }

    @action
    setClientId( clientId ) {
        if( !clientId ) return;

        this.clientId = clientId;
    }

    @action
    setImageId( imageId ) {
        this.imageId = imageId;
    }
}

const stateStore = new StateStore();
export default stateStore;
