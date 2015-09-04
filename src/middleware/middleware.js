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

            //the main action concerning the user
            if (action.type === 'ROUTER_NAVIGATION'){
                changeBrowserURL(action);
                return  next(action)

            }
            //special thunk just for the router
            if (action.type === 'RTR_ACTION'){
               return action.work(dispatch,getState);
            }

            return  next(action);

        }

    }

}




