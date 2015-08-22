function router  (state,action){

    state = typeof state !== 'undefined' ? state : {};
    action = typeof action !== 'undefined' ? action : {};

    switch (action.type) {


        case 'ROUTER_NAVIGATION':

            //console.log('SET_ROUTER_STATE FROM LINK REDUCER CALLED!! with = '+action.hash);
            var routerObj = action.router;
            var result = {}

            Object.keys(state).forEach(function(item){
                result[item] = state[item]
            });


            Object.keys(routerObj).forEach(function(item){
                result[item] = routerObj[item]
            });


            return result;


        default:
            return state
    }
}

module.exports = {
    router:router
};
