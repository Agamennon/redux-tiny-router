
import {utils} from '../utils/utils.js';


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
    var router = utils.urlToRouter(url);
    console.log('rtrChangeUrl FIRED!');
    return {
        type:'RTR_ROUTER_NAVIGATION',
        router,
        fromPopEvent
    };
}



export function rtrPreventNavigation(message){
    console.log('RTR_PREVENT_NAVIGATION FIRED GHOST LOG!!!');
    return {
        type:'RTR_PREVENT_NAVIGATION',
        message
    }
}

export function rtrAllowNavigation(){
    console.log('RTR_ALLOW_NAVIGATION FIRED!!!');
    return {
        type:'RTR_ALLOW_NAVIGATION'
    }
}

export function rtrPreventedNavigationAttempted(url){
    console.log('FUCKING DISPATCHING PREVENT ATTEMPT  === '+url);
    return {
        type:'RTR_PREVENTED_NAVIGATION_ATTEMPTED',
        url
    }
}

export function rtrDoPreventedNavigation(){

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
            console.log('DO PREVENT FIRE!!!!!');
            dispatch(rtrChangeUrl(url))
        }

    };
    /*return {
        type:'RTR_DO_PREVENTED_NAVIGATION',
        ignorePrevent:true
    }*/
}

export function rtrUniversalSetPeniding(val,done){
    console.log('rtrUniversalsetPending action');
    return {
        type:'RTR_UNIVERSAL_SET_PENDING',
        val,
        done
    }
}



export function rtrUniversalPromiseDone(val){
    return {
        type:'RTR_UNIVERSAL_PROMISE_DONE'
    }
}

/*
export function rtrUniversalPendingChanged(val){

    return {
        type:'RTR_ACTION',
        work: (dispatch,getState)=>{
            dispatch(rtrUniversalSetPeniding(val));
        }
    }
}





export function rtrUniversalDone(val){
    console.log('rtrUniversalDone action');
    return {
        type:'RTR_UNIVERSAL_DONE',
        val
    }
}
*/


/*


export function rtrUniversalSendPromise(promise){
    console.log('rtrUniversalSendPromise action');
    return {
        type:'RTR_UNIVERSAL_SEND_PROMISE',
        data:{promise}
    }
}*/
