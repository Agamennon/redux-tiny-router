
function router (state = {},action= {}){

    switch (action.type) {

        case 'PREVENT_NAVIGATION':
              return {
                    ...state,
                    preventNavigation:true,
                    preventNavigationMessage:action.message
                 };

        case 'PREVENTED_NAVIGATION_ATTEMPTED':
            return {
                ...state,
                attemptedOnPrevent:action.url
            };

        case 'ALLOW_NAVIGATION':

            delete state.attemptedOnPrevent;
            return {
                ...state,
                preventNavigation:false

            };

        case 'ROUTER_NAVIGATION':

            var routerObj = action.router;

            return {
                ...state,
                ...routerObj
            };


        case 'UNIVERSAL_SET_PENDING':
            return {
                ...state,
                pending:action.val
            };


        case 'UNIVERSAL_PROMISE_DONE':
            return {
                ...state,
                promiseDone:true
            };

        case 'UNIVERSAL_SYNC_ACTIONS_DONE':
            return {
                ...state,
                syncActionsDone:true
            };

        case 'UNIVERSAL_SYNC_ACTIONS_PENDING':
            return {
                ...state,
                syncActionsDone:false
            };


        default:

            return {
                ...state
            }
    }

}


export default {
    router:{router}
}

