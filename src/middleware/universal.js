//import * as utils from '../utils/utils.js';
import {utils}  from '../utils/utils.js';
import * as actions from '../actions/actions.js'

function isPromise(val) {
    return val && typeof val.then === 'function';
}


function keep(promise,dispatch, getState){

    dispatch(actions.universalIncPending());
    promise.then(function(data){
        setTimeout(()=>{ //dont be mad at this! its seems dirty but it just makes my resolution of the promise happens after the user.
            dispatch(actions.universalDecPending());
        },0)
    });
}

export function universal ({ dispatch, getState }) {

    return (next) => {
        return (action) => {
            var promiseDone = getState().router.promiseDone;
            if (promiseDone === true){ //if the universal router - re-rendered, be done! (stop calls to apis etc...)
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
           return  next(action);

        }
    }

}
