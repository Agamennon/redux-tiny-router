//import * as utils from '../utils/utils.js';
import {utils}  from '../utils/utils.js';



function isPromise(val) {
    return val && typeof val.then === 'function';
}

var ready = true;

var x = 0;
var n = 0;

function keep(promise){
    console.log('router middleware promise kept');
    utils.unfulfilled++;
    x++;
    promise.then(function(data){
        utils.unfulfilled--;
        console.log('fullfiled');
        x--
        data
    });
}


export function universal ({ dispatch, getState }) {
    return (next) => {
        return (action) => {
             n++
          //  console.log(action);
            //sudo code
            //find promise, push promise to array, keep count, iterate array for reselve/reject, keep tally
            if (isPromise(action)){
                keep(action);
            }else{
                for (var key in action){
                    if (isPromise(action[key])){ //needs has own property check
                        keep(action[key]);
                    }
                }
                //
            }



            console.log('universal middleware action n = '+n+' action type = '+action.type + ' count = '+x);
            return  next(action);
        }
    }

}



