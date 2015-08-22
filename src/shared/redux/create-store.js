
import { createStore, applyMiddleware, combineReducers, compose  } from 'redux'
import promiseMiddleware from './promise-middleware'
//import {middleware as reduxTinyRouterMiddleware ,reducer as reduxTinyRouterReducer} from './router/router';
var reduxTinyRouterMiddleware = require('./router/index.js').middleware;
var reduxTinyRouterReducer = require('./router/index.js').reducer;


//console.log(routerMiddleware);
//console.log(routerMiddleware2);
//console.log(router);
//console.log(router2);

//import thunk from 'redux-thunk'
import * as reducers from './reducers'
import sa from 'superagent'

export default function (data,url) {

     // var reducer = combineReducers(Object.assign(reducers,routerReducers));

    var reducer = combineReducers(Object.assign(reduxTinyRouterReducer,reducers));
    var finalCreateStore;
   // var noDebug = false;

    //__CLIENT__ ? persistState(url.match(/[?&]debug_session=([^&]+)\b/)):null,

    if ( (__DEVELOPMENT__) && (__DEBUG__) && (__CLIENT__)) {

        const { devTools, persistState } = require('redux-devtools');

        finalCreateStore = compose(
            applyMiddleware(promiseMiddleware,reduxTinyRouterMiddleware),
            devTools(),
            persistState(url.match(/[?&]debug_session=([^&]+)\b/)),
            createStore
        );

    } else {
        finalCreateStore = applyMiddleware(promiseMiddleware,reduxTinyRouterMiddleware)(createStore);
    }
    return finalCreateStore(reducer, data);

}



/* if (__CLIENT__){

 sa.post('/api/data').send({index:1,text:'guilherme'}).end(function(saErr,saRes){
 if (saErr){
 console.log(saErr);
 console.log('from error');
 }
 else{

 console.log('from client data from client bitches ' + saRes.user);
 }

 });
 } else {
 // .set('cookie', req.get('cookie'))
 var some =  sa.post('http://localhost:3000/api/data');
 if (req.get('cookie'))
 some.set('cookie',req.get('cookie'));
 some.send({index:1,text:'guilherme'});
 some.end(function(saErr,saRes){
 if (saErr){
 //    console.log(saErr);
 console.log('from error');
 }
 else{
 console.log('from server data ' + saRes.user);

 }

 });
 // if ( req.get('cookie'))
 //   some.set('cookie', req.get('cookie'))
 }*/