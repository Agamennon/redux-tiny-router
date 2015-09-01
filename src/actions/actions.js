
import {utils} from '../utils/utils.js';


// ****************************** NAVIGATION *****************************************
export function rtrNavigateTo(path,params){

    var url = utils.toQueryString(path,params);
    return {
        type:'RTR_ACTION',
        work:(dispatch,getState)=>{
            dispatch(rtrUrlChanged(url))
        }

    };
}

export function rtrUrlChanged(url,fromPopEvent){

    return {
        type:'RTR_ACTION',
        work:(dispatch,getState)=>{
            var prevent = getState().router.preventNavigation;
            if (prevent === true){
                dispatch(rtrPreventedNavigationAttempted(url));
            } else {
                dispatch(rtrChangeUrl(url,fromPopEvent));
            }
        }

    };
}


export function rtrChangeUrl(url,fromPopEvent){
    console.log('rtrChangeUrl to called '+url);
    var router = utils.urlToRouter(url);
    return {
        type:'RTR_ROUTER_NAVIGATION',
        router,
        fromPopEvent
    };
}




//  ************************* NAVIGATION PREVENTION *************************************
export function rtrPreventNavigation(message){
    return {
        type:'RTR_PREVENT_NAVIGATION',
        message
    }
}

export function rtrAllowNavigation(){
    return {
        type:'RTR_ALLOW_NAVIGATION'
    }
}

export function rtrPreventedNavigationAttempted(url){
    return {
        type:'RTR_PREVENTED_NAVIGATION_ATTEMPTED',
        url
    }
}

export function rtrDoPreventedNavigation(){
    console.log('do prvent navigation called');
    return {
        type:'RTR_ACTION',
        work:(dispatch,getState)=>{
            var url = getState().router.attemptedOnPrevent;
            dispatch(rtrAllowNavigation());
            if (url === '_back'){
                history.back();
                return
            }
            if (url === '_forward'){
                history.forward();
                return
            }
            console.log('do prvent change url called with ='+url);
            dispatch(rtrChangeUrl(url))
        }

    };
}



//  ************************* UNIVERSAL HELPERS *************************************
export function rtrUniversalSetPeniding(val,done){
    return {
        type:'RTR_UNIVERSAL_SET_PENDING',
        val,
        done
    }
}

export function rtrUniversalPromiseDone(){
    return {
        type:'RTR_UNIVERSAL_PROMISE_DONE'
    }
}




export function syncActionsDone(){

    return {
        type:'RTR_UNIVERSAL_SYNC_ACTIONS_DONE'
    }
}

export function syncActionsPending(){
    return {
        type:'RTR_UNIVERSAL_SYNC_ACTIONS_PENDING'
    }
}


export function rtrUniversalIncActions(){

    return {
        type:'RTR_UNIVERSAL_INC_ACTIONS'
    }
}


export function rtrUniversalRendered(val){
    return {
        type:'RTR_UNIVERSAL_RENDERED',
        val
    }
}

