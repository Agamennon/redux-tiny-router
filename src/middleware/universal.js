//import * as utils from '../utils/utils.js';
import {utils}  from '../utils/utils.js';

function isPromise(val) {
    return val && typeof val.then === 'function';
}

function keep(promise){
    utils.unfulfilled++;
    promise.then(function(data){
        utils.unfulfilled--;
    });
}

export function universal ({ dispatch, getState }) {
    return (next) => {
        return (action) => {
            if (isPromise(action)){
                keep(action);
            }else{
                for (var key in action){
                    if (isPromise(action[key])){ //needs has own property check
                        keep(action[key]);
                    }
                }
            }
           // console.log('universal middleware action n = '+n+' action type = '+action.type + ' count = '+x);
            return  next(action);
        }
    }
}



