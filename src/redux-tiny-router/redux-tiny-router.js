var qs = require('query-string');
import * as actions from '../actions/actions.js'
import {utils} from '../utils/utils';
import React from 'react';

var skipevent = false;
export function init (store) {

    window.onbeforeunload = function(e) {
        if (store.getState().router.preventNavigation && store.getState().router.preventNavigationMessage.length > 0){
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

        global.__CLIENT__ = false;
        console.log('universal starting...');

        var store = createStore({},'http://'+url),
            state = {},
            t = 1,
            done,
            rendered = false,
            pending,
            html;

        store.dispatch(actions.rtrUniversalSetPeniding(0));
        var doneEvent = false;



        var unsubscribe = store.subscribe(()=>{

            state = store.getState();
            pending = state.router.pending;

            t++;
            console.log('N = '+t+ ' pending = '+pending + ' doneEvent = '+doneEvent + ' done = '+ done);
            if ((pending === 0) && (!rendered)){
                html = React.renderToString(<Layout store={store}/>);

                rendered = true;
                console.log('RENDERED....')
            }


            if ((pending === 0) && (rendered)){
                    unsubscribe();
                    store.dispatch(actions.rtrUniversalPromiseDone());



                //    setTimeout(()=>{

                        console.log(JSON.stringify(store.getState(),null, 2));


                        html = React.renderToString(<Layout store={store}/>);

                        console.log('FSA2 === '+JSON.stringify(state.data.fsa2Result));

                        console.log('SENDING...');

                        console.log('BELOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWww');
                        console.log(state.data);
                        console.log(state.router.pending);
                        console.log('ABBBBBBBBBBBOOOOOOOOOOOOOOOOVVVVVVVVVVVVVVvvv');
                        resolve({html,state});
               //     },0);

            //    }
                //     html = React.renderToString(<Layout store={store}/>);


            }


        });

        //  store.dispatch(actions.handleHashChange(url.substring(url.indexOf('/'))));
        store.dispatch(actions.rtrUrlChanged(url.substring(url.indexOf('/'))));
    });

}

