
function router (state = {},action= {}){

    console.log('router reducer');
    switch (action.type) {


        case 'ROUTER_NAVIGATION':

            //    console.log('SET_ROUTER_STATE FROM LINK REDUCER CALLED!! with = '+action.hash);
            var routerObj = action.router;


            return {
                ...state,
                ...routerObj
            };


        default:
            return state
    }
}

export default {router}

