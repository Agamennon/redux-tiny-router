
import {utils} from '../utils/utils.js';


// ****************************** NAVIGATION *****************************************
export function navigateTo(path, params, silent){
    if (typeof params === 'boolean'){
        silent = params;
        params = undefined;
    }

    var url = utils.toQueryString(path,params);
    return {
        type:'RTR_ACTION',
        work:(dispatch,getState)=>{
            const option = silent?'silent':'';
            dispatch(urlChanged(url,option))
        }

    };
}



export function urlChanged(url, option){

    return {
        type:'RTR_ACTION',
        work:(dispatch,getState)=>{
            var prevent = getState().router.preventNavigation;
            if (prevent === true){
                dispatch(preventedNavigationAttempted(url));
            } else {
                dispatch(changeUrl(url,option));
            }
        }

    };
}


export function changeUrl(url, option){
    var router = utils.urlToRouter(url);

    return {
        type:'ROUTER_NAVIGATION',
        router,
        option
    };
}




//  ************************* NAVIGATION PREVENTION *************************************
export function preventNavigation(message){
    return {
        type:'PREVENT_NAVIGATION',
        message
    }
}

export function allowNavigation(){
    return {
        type:'ALLOW_NAVIGATION'
    }
}

export function preventedNavigationAttempted(url){

    return {
        type:'PREVENTED_NAVIGATION_ATTEMPTED',
        url
    }
}

export function doPreventedNavigation(){

    return {
        type:'RTR_ACTION',
        work:(dispatch,getState)=>{
            var url = getState().router.attemptedOnPrevent;
            if (url){
                dispatch(allowNavigation());

                if (url === '_back'){
                    history.back();
                    return
                }
                if (url === '_forward'){
                    history.forward();
                    return
                }

                dispatch(changeUrl(url));

            } else {
                console.warn('user have not attempted navegating under prevent!');
            }

        }

    };
}



//  ************************* UNIVERSAL HELPERS *************************************
export function universalSetPeniding(val, done){
    return {
        type:'UNIVERSAL_SET_PENDING',
        val,
        done
    }
}

export function universalPromiseDone(){
    return {
        type:'UNIVERSAL_PROMISE_DONE'
    }
}


export function syncActionsDone(){

    return {
        type:'UNIVERSAL_SYNC_ACTIONS_DONE'
    }
}

export function syncActionsPending(){
    return {
        type:'UNIVERSAL_SYNC_ACTIONS_PENDING'
    }
}

