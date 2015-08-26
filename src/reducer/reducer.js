
function router (state = {},action= {}){

    //console.log('router reducer = '+action.type);
    switch (action.type) {

        case 'ROUTER_NAVIGATION':

            //       console.log('SET_ROUTER_STATE FROM LINK REDUCER CALLED!! with = '+action.path+action.search);
            //console.log(action);
            var routerObj = action.router;


            return {
                ...state,
                ...routerObj
            };

        case 'MERDA':


            return {
                ...state,
                merda:'supermerda'

            };

        default:

            return {...state}
    }



}


export default {
    router:{router}
}

