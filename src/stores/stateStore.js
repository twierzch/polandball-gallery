import { action, observable } from 'mobx';


import { destringifyQuery, stringifyQuery } from 'src/utils/stringifyQuery';


class StateStore {
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

        if( query ) {
            const queryObj = destringifyQuery( query );
            this.setClientId( queryObj.clientId );
        }
    }

    @action.bound
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
