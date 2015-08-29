//import * as utils from '../utils/utils.js';
import {utils}  from '../utils/utils.js';
import * as actions from '../actions/actions.js'

function isPromise(val) {

    return val && typeof val.then === 'function';
}


function keep(promise,dispatch, getState){
    console.log('promise kept!');
    var pending = getState().router.pending;
    pending++;
    dispatch(actions.rtrUniversalSetPeniding(pending));
    //  dispatch(actions.rtrUniversalSendPromise(promise));



    promise.then(function(data){
        pending = getState().router.pending;
        pending--;
        setTimeout(()=>{ //dont be mad at this! its seems dirty but it just makes my resolution of the promise hapens after the user
            //dispatch(actions.rtrUniversalSetPeniding(pending));

            dispatch(actions.rtrUniversalSetPeniding(pending));
         //   if (pending === 0)
           //     dispatch(actions.rtrUniversalPromiseDone());



        },0)
    });
}


//export const universal = store => next => action => {
export function universal ({ dispatch, getState }) {

    return (next) => {
        return (action) => {

            var promiseDone = getState().router.promiseDone;
            if (promiseDone === true){
                console.log("********************************* STOPED **************************************");
                return
            }

            if (isPromise(action)) {
                keep(action, dispatch, getState);
            } else {
                for (var key in action) {
                    if (isPromise(action[key])) { //needs has own property check
                        keep(action[key], dispatch, getState);
                    }
                }
            }
            // console.log('universal middleware action n = '+n+' action type = '+action.type + ' count = '+x);
            console.log("********************************* NOT STOPED **************************************");
            return next(action);
        }
    }

}

/*
 export function universal ({ dispatch, getState, state }) {


 return (next) => {
 return (action) => {
 if (isPromise(action)) {
 keep(action);
 } else {
 for (var key in action) {
 if (isPromise(action[key])) { //needs has own property check
 keep(action[key]);
 }
 }
 }
 // console.log('universal middleware action n = '+n+' action type = '+action.type + ' count = '+x);
 return next(action);
 }
 }

 }


 */

