
function router (state = {},action= {}){

    switch (action.type) {

        case 'RTR_PREVENT_NAVIGATION':
              return {
                    ...state,
                    preventNavigation:true,
                    preventNavigationMessage:action.message
                 };

        case 'RTR_PREVENTED_NAVIGATION_ATTEMPTED':
            return {
                ...state,
                attemptedOnPrevent:action.url
            };

        case 'RTR_ALLOW_NAVIGATION':
            return {
                ...state,
                preventNavigation:false
            };

        case 'RTR_ROUTER_NAVIGATION':
            var routerObj = action.router;
            return {
                ...state,
                ...routerObj
            };


        case 'RTR_UNIVERSAL_SET_PENDING':
            return {
                ...state,
                pending:action.val
            };


        case 'RTR_UNIVERSAL_PROMISE_DONE':
            return {
                ...state,
                promiseDone:true
            };


        default:

            return {...state}
    }

}


export default {
    router:{router}
}

