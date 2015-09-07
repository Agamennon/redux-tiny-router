import {utils}  from '../utils/utils.js';
import * as actions from '../actions/actions.js';

function changeBrowserURL(action){

    const option = action.option;
    switch (option) {
        case ('silent'):
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            history.replaceState(utils.navindex, null, action.router.previous);
            return;
        case ('popEvent'): //pop event already poped the url
            return;
        default:
            utils.navindex++;
            history.pushState(utils.navindex, null, action.router.url);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

}


export function middleware ({ dispatch, getState }) {
    return (next) => {
        return (action) => {
            //the main action concerning the user
            if (action.type === 'ROUTER_NAVIGATION'){
                if (__CLIENT__) {
                    if (history.pushState) { //fallback to Refresh
                        changeBrowserURL(action);
                    } else if (action.option !== 'popEvent') {
                        window.location.assign(action.router.url);
                        return
                    }
                }
                return next(action)
            }

            //special thunk just for the router
            if (action.type === 'RTR_ACTION'){
                return action.work(dispatch,getState);
            }
            return  next(action);
        }
    }

}




