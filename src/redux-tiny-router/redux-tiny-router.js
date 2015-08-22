var qs = require('query-string');
var actions = require('../actions/actions.js');
//module.exports = exports = gcouch =


function init (store) {
    var hash;
    window.addEventListener('hashchange', function(){
        console.log('hash change');
        hash = location.hash.substr(1)||'/';
        store.dispatch(actions.handleHashChange(hash));
        /*store.dispatch({
         type:'ROUTER_NAVIGATION',
         hash
         });*/
    });
}


function initUniversal (url,createStore){

    let store = createStore({},'http://'+url,true);
    store.dispatch(actions.handleHashChange(url.substring(url.indexOf('/'))));
    var state =  store.getState();

    store = createStore(state,'http://'+url);
    //

    //const store = createStore(payload,'http://'+req.headers.host+req.url,false);
    return {state,store}
}

module.exports  = {
    init:init,
    initUniversal:initUniversal
};