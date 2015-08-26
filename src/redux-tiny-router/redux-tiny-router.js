var qs = require('query-string');
import * as actions from '../actions/actions.js'
import {utils} from '../utils/utils';
import React from 'react';

export function init (store) {
  //  console.log(url.substring(url.indexOf(location)));
   // var location = window.location.pathname + window.location.search;
   // store.dispatch(actions.handleHashChange(location));
    window.onpopstate = function(data){
        console.log('window on popState');
        var location = window.location.pathname + window.location.search;

        store.dispatch(actions.handleHashChange(location));
    };
    //todo add hash option
/*    window.addEventListener('hashchange', function(data){
        console.log('hash change');
        console.log(data);
    });*/
}

export function initUniversal (url,createStore,Layout){


    return new Promise ((resolve,reject) =>{
        var store = createStore({},'http://'+url);
        var state = {};
        var t = 1;
        var bundleStart = Date.now();
        var rendered = false;
        var  unsubscribe = store.subscribe(()=>{

            console.log(t+' = Event ' + (Date.now() - bundleStart) + 'ms - unfulfilled = '+utils.unfulfilled);
            //console.log (t);
            t++;


            //working

      /*      if ((utils.unfulfilled === 0) && (!rendered)){
                rendered = true;
                state =  store.getState();
                store = createStore(state,'http://'+url);
                resolve({state,store});
            }*/


            //not Working

           // console.log(<Layout/>);

            if ((utils.unfulfilled === 0) && (!rendered)){
                state =  store.getState();
                store = createStore(state,'http://'+url);
                console.log('rendering...');

                setTimeout(()=>{
                    console.log(<Layout store={store}/>);
                    var html = React.renderToString(<Layout store={store}/>);
                    rendered = true;
                    console.log(html);
               //     resolve({html,state});
                },10);


               // console.log('where is html you FUCK!');
               //var  html = '<div>fuuuuuck</div>';

                //console.log(html);


               // resolve({state,store});

            }
        /*    if ((utils.unfulfilled === 0) && (rendered)){
                unsubscribe();
                state =  store.getState();
                store = createStore(state,'http://'+url);
                resolve({html,state});
                //   resolve({state,store});

            }*/


        });


        store.dispatch(actions.handleHashChange(url.substring(url.indexOf('/'))));


    });

}

