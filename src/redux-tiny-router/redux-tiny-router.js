var qs = require('query-string');
import * as actions from '../actions/actions.js'

export function init (store) {
  //  console.log(url.substring(url.indexOf(location)));
   // var location = window.location.pathname + window.location.search;
   // store.dispatch(actions.handleHashChange(location));
    window.onpopstate = function(data){
        var location = window.location.pathname + window.location.search;

        store.dispatch(actions.handleHashChange(location));
    };
    //todo add hash option
/*    window.addEventListener('hashchange', function(data){
        console.log('hash change');
        console.log(data);
    });*/
}

export function initUniversal (url,createStore){

    let store = createStore({},'http://'+url);
    //console.log(url.substring(url.indexOf('/'))+ ' FROM INIT UNIVERSAL');
    store.dispatch(actions.handleHashChange(url.substring(url.indexOf('/'))));
    var state =  store.getState();
    store = createStore(state,'http://'+url);
    return {state,store}
}

