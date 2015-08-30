var qs = require('query-string');
import * as actions from '../actions/actions.js'
import {utils} from '../utils/utils';
import React from 'react';

var skipevent = false;
export function init (store) {

    window.__UNIVERSAL__ = __UNIVERSAL__ || false;

    if (!__UNIVERSAL__){
        var url = window.location.pathname + window.location.search;
        store.dispatch(actions.rtrUrlChanged(url));
    }

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
            store.dispatch(actions.rtrUrlChanged(direction,true));
        } else {
            store.dispatch(actions.rtrUrlChanged(url,true)); //business as usual
        }
        utils.navindex = index;
    }


}

export function initUniversal (url,createStore,Layout){

    return new Promise ((resolve,reject) =>{

        global.__CLIENT__ = false;

        var store = createStore({},'http://'+url),
            state = {},
            reRender = false,
            rendered = false,
            pending,
            html;

        store.dispatch(actions.rtrUniversalSetPeniding(0));

        var unsubscribe = store.subscribe(()=>{
            state = store.getState();
            pending = state.router.pending;
            if ((pending === 0) && (!rendered)){
                console.log('rendering...');
                html = React.renderToString(<Layout store={store}/>);
                rendered = true;
            }
            if (rendered && pending > 0){
                reRender = true;
            }
            if ((pending === 0) && (rendered)){
                unsubscribe();
                store.dispatch(actions.rtrUniversalPromiseDone());
                if (reRender){
                    console.log('re-rendering...');
                    html = React.renderToString(<Layout store={store}/>);
                }
                resolve({html,state});
            }
        });

        store.dispatch(actions.rtrUrlChanged(url.substring(url.indexOf('/'))));
    });

}

