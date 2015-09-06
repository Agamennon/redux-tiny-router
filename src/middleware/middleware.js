import {utils}  from '../utils/utils.js';

function changeBrowserURL(action){
    if (__CLIENT__) {
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




