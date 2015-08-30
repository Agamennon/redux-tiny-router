# Redux Tiny Router

A Router made for Redux and made for universal apps! stop using the router as a controller... its just state!

Its simple, and its small

### Using client side

Create your store with the redux-tiny-router middleware and reducer

```es6
import { createStore, applyMiddleware, combineReducers} from 'redux';
import { middleware as reduxTinyRouterMiddleware, reducer as reduxTinyRouterReducer } from 'redux-tiny-router';
import * as yourReducers from './reducers'

  var reducer  = combineReducers(Object.assign({},reduxTinyRouterReducer,yourReducers));
  // reduxTinyRouterMiddleware needs to come after your middleware if you want to enable thinkgs like stoping routes on your middleware
  var finalCreateStore = applyMiddleware(appMiddleware,reduxTinyRouterMiddleware)(createStore); 
  store = finalCreateStore(reducer,{});
```

Standard stuff, for now you just added a middleware and a reducer from redux-tiny-router, you should turn this in to a function
that returns the store  that you can import for convenience and if you plan on doing an Universal app 

Now you only have to call the init function with the store before you render your app:
```es6
import { reduxTinyRouter } from 'redux-tiny-router';

 reduxTinyRouter.init(store);

 React.render(<App store={store}/>,
      document.getElementById('app')
  );

...
```
DONE!

If you enter any paths to your url you will notice that you also have a router object on your state containing relevant information about the current route,
but how to change the route inside the app?
 
### redux-tiny-router action creactors
Yup, you call an action, first import the router actions:
```
import {routerActions} from 'redux-tiny-router'
//navigates to a route with optional search object
routerActions.rtrNavigateTo('/somepath', {message:1});
```
The router will navigate to (/somepath?message=1) and set the router object with the info, for that it fires an action `type:'RTR_ROUTER_NAVIGATION'`
that you can use to intercept the action on your middleware and do all sorts of interesting thinks, more later...


Some more cool actions:
 ```
 rtrPreventNavigation(); //bonus! call this with a string and will prevent the user from navigating away from the page too!
 ```
Does what it says, after you call this you lock navigation, usefull if the user is on a form and you want to warn him about pending changes,
if the user attemps to navigate, it fires and action `type:RTR_PREVENTED_NAVIGATION_ATTEMPTED` that will set a field in your router with
the attempted route, you actualy dont need to wory about this, you can just check on your app if the value on the router.attemptedOnPrevent 
is set to a value and router.preventNavigation is true (this will change to a new boolean field in a future version),
in this case you can show a popup warning the user of pending changes. But what if the users whats to navigate away?

 ```
  rtrDoPreventedNavigation();
 ```
You call this action!, it will read the value from router.attemptedOnPrevent and navigate there! (it handles back and forward buttons just fine)

```
 rtrAllowNavigation();
```
That just allows navigation again. if you want to handle the navigate after confirm implementation yourself.
 
 
### How to?
 
##### Basic routing

You could just do this, inside your react app,
```
@connect((state ) => {  //only get what you need, getting the whole thing for simplicity
    return {
        state:state
    }
})
const Comp = React.createClass({
  render() {
    switch (this.props.state.router.path) {
        case 'home':
            return <Home/>;
        case 'messages':
            return <Settings/>
    }
  }
});
```
If you want more flexibility you could do thinks a little diferent, inside your reducer you could listen to whatever action you like
and dispatch that from your middleware 
 
```
inside you reducer...

switch (action.type) {
 
     case 'MY_ROUTER':
            return {
                ...state,
                directory: action.router.path 
            };
            
     case ....

```
and in your middleware you listen to the ```RTR_ROUTER_NAVIGATION``` action
```
  inside you middleware...
  
      if (action.type === 'RTR_ROUTER_NAVIGATION'){
             disptach({     //on your app please use an action creator ..
                type:'MY_ROUTER'
                directory:path
             })      
       }

```
Now on the app you look at your directory propery on the state, why is this more flexible?, where did the path came from? ... read on
 
 
you tipicaly do your routing inside your middleware, in this middleware you will check for an action with type ```RTR_ROUTER_NAVIGATION```
this action carries the router object with all the information parsed for you. ex:

```
inside you middleware...

if (action.type === 'RTR_ROUTER_NAVIGATION'){
     var path = action.router.path;
     
     switch (path){
        case '/secureplace':
          // check if the user is logged in, if not
          routerActions.rtrNavigateTo('/login'); //redirect him to login
          return  //notice i am not returning next(action) this stops the RTR_ROUTER_ACTION as it not forwarded to the reduces, therefore navigation to /secureplace is halted
          
          // if the user is logged in just let it pass  
          return next(action)

        case '/home': {
            // do stuff for the home route if you want including fething or anything you like
            return next(action) 
        }
        
        case '/messages': {
           path = path + '/' + action.router.search.param1; // now on your app you can expect a diferent path for this one   
           you could for instance do this:
           action.router.path = path ; 
           delete action.router.search //// and you rewrote the url from a query string to a id style on the fly to your router
           // you could not do this last stap and just use the re-writen path on your own state, and look there for the path,
           // in summary you decide how to route your app anyway you like its just state!
           
        }
        
        case '/notfound': {
           return next(action);
        }
        
        default:
            routerActions.rtrNavigateTo('/notfound'); //redirect to not found
   
        
     }
     
            disptach({  
                  type:'MY_ROUTER'
                  directory:path   // <-- notice that in the case of messages we have manipulated this string (hance flexibility)
             })      
     
     return 
              
}
```

You could do your all your routing just by looking at the router.path and router.search and other fileds that you create on the router object on your own state,
mix and match that with your stuff, just use your stuff, its up to you.
 
### Universal Apps
  
 docs todo  (implementation is done...)
    

Inspired by cerebral reactive router

### License

MIT


