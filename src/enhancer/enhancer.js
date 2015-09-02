import {init,initUniversal} from '../redux-tiny-router/redux-tiny-router.js';
import {middleware as tinyMiddleware} from '../middleware/middleware.js';
import {universal as tinyUniversal} from '../middleware/universal.js';
import {router as tinyReducer} from '../reducer/reducer.js';
import {combineReducers} from 'redux';

function compose(...funcs) {
    return funcs.reduceRight((composed, f) => f(composed));
}

function is_server() {
    return ! (typeof window != 'undefined' && window.document);
}

export function applyMiddleware(...middlewares) {
    return (next) => (reducer, initialState) => {

       if (is_server()){
           global.__CLIENT__ = false;
           global.__UNIVERSAL__ = global.__UNIVERSAL__ || false;
       } else {
           window.__CLIENT__ = true;
           window.__UNIVERSAL__ = window.__UNIVERSAL__ || false;
       }


        function reducerEnhancer (state,action){
            //need to find a way to stick my reducer in here and allow client to call combineReducers
            Object.assign(reducer,tinyReducer,reducer);
            var res = combineReducers(reducer);
            return res(state,action);

        }


        var store = next(reducerEnhancer, initialState);


        middlewares.push(tinyMiddleware);
        if (__UNIVERSAL__ && !__CLIENT__){
            middlewares.unshift(tinyUniversal);
        }

        var dispatch = store.dispatch;
        var chain = [];

        var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        };
        chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain, store.dispatch);

        var result = {
            ...store,
            dispatch
        };

        if (__CLIENT__){
            init(result);
       }

        return result;


    };
}