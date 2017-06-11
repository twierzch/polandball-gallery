import Navigo from 'navigo';

import stateStore from 'src/stores/stateStore';
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

export default router;
