var qs = require('query-string');
import * as actions from '../actions/actions.js'
import {utils} from '../utils/utils';
import React from 'react';

var skipevent = false;
export function init (store) {

    window.onbeforeunload = function(e) {
      if (store.getState().router.preventNavigation){
          return store.getState().router.preventNavigationMessage
      }
    };



    window.onpopstate = function(e){
        console.log('SKIPEVENT = '+skipevent);
        if (skipevent) {
           skipevent = false;
           utils.navindex = e.state || 0;
           return
        }

        let index,navindex,direction,url;
        index = e.state || 0;
        navindex = utils.navindex;
        direction = (index < navindex) ? '_back':'_forward';
        url = window.location.pathname + window.location.search;
        console.log('index ='+index + ' navindex = '+navindex);
        console.log('direction => '+direction);

        if (store.getState().router.preventNavigation){ //if router is preventing navigation
            //console.log("preventing navigation setting skip = true");
            skipevent = true;
          //  e.preventDefault();
            (index < navindex) ? history.forward() : history.back();
            //  history.pushState(adjustedindex,'',store.getState().router.url); //make thinks stay the same. push back the state that was poped
            console.log('popstate is fireing rtrUrlChanged');
            store.dispatch(actions.rtrUrlChanged(direction,true));
          //  utils.navindex = adjustedindex;
           // return;
            //    return store.dispatch(actions.rtrPreventedNavigationAttempted(direction)); //it was an attempt to route while prevented!
        } else {
            store.dispatch(actions.rtrUrlChanged(url,true)); //business as usual
        }
        utils.navindex = index;
    }


}

export function initUniversal (url,createStore,Layout){

    return new Promise ((resolve,reject) =>{
        utils.unfulfilled = 0;
        global.__CLIENT__ = false;
        console.log('universal starting...');
        var store = createStore({},'http://'+url),
            state = {},
            t = 1,
            rendered = false,
            html,
            unsubscribe = store.subscribe(()=>{
                t++;
                if ((utils.unfulfilled === 0) && (!rendered)){
                    html = React.renderToString(<Layout store={store}/>);
                    rendered = true;
                    console.log('RENDERED....')
                }
                if ((utils.unfulfilled === 0) && (rendered)){
                    console.log('SENDING...');
                    unsubscribe();
                    state =  store.getState();
                    resolve({html,state});
                }
            });

        //  store.dispatch(actions.handleHashChange(url.substring(url.indexOf('/'))));
        store.dispatch(actions.rtrUrlChanged(url.substring(url.indexOf('/'))));
    });

}

