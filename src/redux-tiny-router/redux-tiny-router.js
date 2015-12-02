var qs = require('query-string');
import * as actions from '../actions/actions.js'
import {utils} from '../utils/utils';
import React from 'react';
import { renderToString } from 'react-dom/server';

var skipevent = false;
export function init (store) {

    var universal = (typeof __UNIVERSAL__ === 'undefined') ? false : __UNIVERSAL__;
    window.__UNIVERSAL__ = universal;
    window.__CLIENT__ = true;

    var url = __UNIVERSAL__ ? store.getState().router.url : window.location.pathname + window.location.search;

    store.dispatch(actions.urlChanged(url,'popEvent'));

    window.onbeforeunload = function(e) {
        if (store.getState().router.preventNavigation && store.getState().router.preventNavigationMessage.length > 0){
            return store.getState().router.preventNavigationMessage
        }
    };


    window.onpopstate = function(e){

        if (skipevent) {
            skipevent = false;
            utils.navindex = e.state || 0;  //navindex is necessary as html5 new api did not bless us with information regarding usage of back / forward button
            return
        }

        let index,navindex,direction,url;
        index = e.state || 0;
        navindex = utils.navindex;
        direction = (index < navindex) ? '_back':'_forward';
        url = window.location.pathname + window.location.search;

        if (store.getState().router.preventNavigation){ //if router is preventing navigation
            skipevent = true; //we prevent by doing the opposite the user did (and dont want to infinite loop)
            (index < navindex) ? history.forward() : history.back();
            store.dispatch(actions.urlChanged(direction,'popEvent'));
        } else {
            store.dispatch(actions.urlChanged(url,'popEvent')); //business as usual
        }
        utils.navindex = index;
    }


}

export function initUniversal (url,createStore,Layout,initialState){

    return new Promise ((resolve,reject) =>{

        global.__CLIENT__ = false;

        initialState = initialState || {};
        var store = createStore(initialState,'http://'+url),
            state = {},
            reRender = false,
            rendered = false,
            pending,
            html;

        store.dispatch(actions.universalSetPeniding(0));

        var unsubscribe = store.subscribe(()=>{
            state = store.getState();
            var syncActionsDone = state.router.syncActionsDone;
            pending = state.router.pending;
            if ((pending === 0) && (rendered)){
                unsubscribe();
                store.dispatch(actions.universalPromiseDone());
                if (reRender){
                   html = renderToString(<Layout store={store}/>);
                }
                delete state.router.pending;
                delete state.router.syncActionsDone;
                resolve({html,state});
            }

            if ((pending ===0) && (!rendered)){
                if (syncActionsDone){

                    html = renderToString(<Layout store={store}/>);
                    rendered = true;
                    store.dispatch(actions.syncActionsPending());
                }
            }
            if ((rendered) && (pending > 0)){
                reRender = true;
            }
        });

        store.dispatch(actions.urlChanged(url.substring(url.indexOf('/'))));
        store.dispatch(actions.syncActionsDone());

    });

}

