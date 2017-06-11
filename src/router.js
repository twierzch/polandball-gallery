import Navigo from 'navigo';
import { reaction } from 'mobx';

import stateStore from './stores/stateStore';
import { destringifyQuery, stringifyQuery } from 'src/utils/stringifyQuery';


const router = new Navigo();

router.on({
    'gallery/:imageId': {
        as: 'imageDetails',
        uses: ( params, query ) => {
            stateStore.updateStateOnUrlChange( 'imageDetails', params, query )
        },
    },
    'gallery': {
        as: 'gallery',
        uses: ( params, query ) => {
            stateStore.updateStateOnUrlChange( 'gallery', params, query )
        }
    },
    '*': () => {
        router.navigate('gallery');
    },
}).resolve();

export function updateUrlOnStateChange() {
    let url = router.generate( stateStore.viewName, { imageId: stateStore.imageId } );

    if( stateStore.clientId ) {
        url += `?${ stringifyQuery({ clientId: stateStore.clientId }) }`
    }

    router.pause();
    router.navigate( url );
    router.resume();
}

const _urlStateChange = reaction(
    () => {
        return {
            viewName: stateStore.viewName,
            clientId: stateStore.clientId,
            imageId: stateStore.imageId,
        }
    },
    updateUrlOnStateChange,
    {
        name: 'urlStateChangeReaction',
    }
)

export default router;
