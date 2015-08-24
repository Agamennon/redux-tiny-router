import {utils} from '../utils/utils.js';

export function middleware ({ dispatch, getState }) {
    return (next) => {
        return (action) => {
            var router;
            if (action.type === 'ROUTER_NAVIGATION'){
                router = utils.parseHash(action.hash);
                action.router = router;
                return(next(action));
            }

            if (action.type === 'ROUTER_NAVIGATE_TO_HASH'){
                window.location.hash = action.path + '?'+ qs.stringify(action.search);
                return;
            }

            if (action.type === 'GUI'){
                action(dispatch,getState);
                return;
            }

            if (action.type === 'ROUTER_NAVIGATE_TO'){
                var url = utils.toQueryString(action.path,action.search);
                router = utils.parseHash(url);
                history.pushState(null, null,url);
                action.type = 'ROUTER_NAVIGATION';
                action.router = router;
//                dispatch(action);//learn this shit on basic tutorial ?? call back action creator?
                //              return;
                return(next(action));
                //  console.log(action);
            }

            return  next(action);
        }
    }

}



