
function router (state = {},action= {}){

    //console.log('router reducer = '+action.type);
    switch (action.type) {


        case 'RTR_PREVENT_NAVIGATION':
     //         console.log('reducer setting preventNavigation = true');
              return {
                    ...state,
                    preventNavigation:true,
                    preventNavigationMessage:action.message
                 };


        case 'RTR_ALLOW_NAVIGATION':
     //       console.log('reducer setting preventNavigation = false');
            return {
                ...state,
                preventNavigation:false
            };

        case 'RTR_ROUTER_NAVIGATION':
            var routerObj = action.router;
            return {
                ...routerObj
            };
            /*return {
                ...state,
                ...routerObj
            };*/

        case 'RTR_PREVENTED_NAVIGATION_ATTEMPTED':
      //      console.log("RTR_PREVENTED_NAVIGATION_ATTEMPTED " + action.url);
            return {
                ...state,
                attemptedOnPrevent:action.url
            };



        default:

            return {...state}
    }



}


export default {
    router:{router}
}

