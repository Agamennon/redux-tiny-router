var qs = require('query-string');
var actions = require('../actions/actions.js');

function init (store) {
    var hash;
    window.addEventListener('hashchange', function(){
        hash = location.hash.substr(1)||'/';
        store.dispatch(actions.handleHashChange(hash));
        /*store.dispatch({
         type:'ROUTER_NAVIGATION',
         hash
         });*/
    });
}


function initUniversal (url,createStore){

    var store = createStore({},'http://'+url,true);
    store.dispatch(actions.handleHashChange(url.substring(url.indexOf('/'))));
    var state =  store.getState();

    store = createStore(state,'http://'+url);

    return {
        state:state,
        store:store
    }
}

module.exports  = {
    init:init,
    initUniversal:initUniversal
};