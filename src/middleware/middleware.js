//import * as utils from '../utils/utils.js';
import {utils}  from '../utils/utils.js';
import * as a from '../actions/actions.js';


function changeBrowserURL(action){
    if (__CLIENT__) {
        if (!action.fromPopEvent) { //pop event already poped the url
            utils.navindex++;
            history.pushState(utils.navindex, null, action.router.url);
        }
    }
}


export function middleware ({ dispatch, getState }) {
    return (next) => {
        return (action) => {

            var router;

            console.log(action.type);

            if (action.type === 'RTR_ROUTER_NAVIGATION'){
                changeBrowserURL(action);
                console.log('RTR_ROUTER_NAVIGATION on middleware');
                return  next(action)

            }

            if (action.type === 'RTR_ACTION'){
               return action.work(dispatch,getState);
            }

            return  next(action);

        }

    }

}




