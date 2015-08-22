var qs = require('query-string');
//import createStore from '../create-store.js';
import * as actions from './actions.js'



export function init (store) {
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


export function initUniversal (url,createStore){

    let store = createStore({},'http://'+url,true);
    store.dispatch(actions.handleHashChange(url.substring(url.indexOf('/'))));
    var state =  store.getState();

    store = createStore(state,'http://'+url);
    //

    //const store = createStore(payload,'http://'+req.headers.host+req.url,false);
    return {state,store}
}