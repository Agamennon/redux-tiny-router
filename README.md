# Redux Tiny Router

A Router made for Redux and made for universal apps! stop using the router as a controller... its just state!

Its simple, and its small  example app in [react-redux-tiny](https://github.com/Agamennon/react-redux-tiny) 

### Using client side OPTION1 (store enhancer)


Create your store with the redux-tiny-router applyMiddleware

```javascript
import { createStore} from 'redux';
import {applyMiddleware} from 'redux-tiny-router'
import * as yourReducers from './someplace'
import yourMiddleware from './someotherplace'

// Don't combine the reducers the middleware does this for you 
  var finalCreateStore = applyMiddleware(yourMiddleware)(createStore); 
  store = finalCreateStore(yourReducers,{}); //just pass your reducers object
```

and you are DONE!

If you enter any paths to your url you will notice that you also have a router object on your state containing relevant information about the current route,
but how to change the route inside the app?
 
### redux-tiny-router action creators
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
Does what it says, after you call this you lock navigation, useful if the user is on a form and you want to warn him about pending changes,
if the user attempts to navigate, it fires and action `type:RTR_PREVENTED_NAVIGATION_ATTEMPTED` that will set a field in your router with
the attempted route, you actually don't need to worry about this, you can just check on your app if the value on the router.attemptedOnPrevent 
is set to a value (this value is the attempted url) in this case you can show a popup warning the user of pending changes. But what if the users whats to navigate away?

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
        default:
            return <NotFound/>;
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
  
you typically do your routing inside your middleware or a react component, in this middleware example you will check for an action with type ```RTR_ROUTER_NAVIGATION```
this action carries the router object with all the information parsed for you. ex:

```
inside you middleware...

import {utils} from 'redux-tiny-router';


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
           action.router = urlToRouter(path); //you just manipulated the hole router obj, urlToRouter takes a path and gives you a router obj
           // or you could not do this last step and just use the re-written path on your own state, and look there for the path,
           // do the routing inside a react component, in summary you decide how to route your app anyway you like its just state!
           
        }
       
       
        default:
            routerActions.rtrNavigateTo('/notfound'); //redirect to not found
   
        
     }
         //also save some info on your own state if you like 
            disptach({  
                  type:'MY_ROUTER'
                  directory:path   // <-- notice that in the case of messages we have manipulated this string (hance flexibility)
             })      
     
     return 
              
}
```

You could do your all your routing just by looking at the router.path and router.search and other fields that you create on the router object on your own state,
mix and match that with your stuff, just use your stuff, its up to you.

The idea here is, the "router" if you think about it its just some state (that comes from url)
and some comparison with that state for you to react 
that could be to render some part of ui or to fetch some data.

 
### What you get in the router obj?
for this url ```/some/cool/url?param=10&param2=nice```

this:
```json
"router": {
      "url": "/some/cool/url?param=10&param2=nice",
      "path": "/some/cool/url",
      "paths": [
        "some",
        "cool",
        "url"
      ],
      "subPath": "cool",
      "lastPath": "url",
      "params": {
        "param": "10",
        "param2": "nice"
      },
      "pattern": "/some/cool/url?param&param2"
    }
```
there is possibly router.attemptedOnPrevent (with the url of a prevented navigation) in case that happend 

you can use any pace of state you like, for instance you could look at paths[0] for the first level and paths[1] for the second
and do nested routing on a react app, this is done in the [react-redux-tiny](https://github.com/Agamennon/react-redux-tiny)  universal starter.

### the utils
the same utils the router uses you can use it too
import {utils} from 'react-tiny-router';
the ones are 
```utils.urlToRouter('/some/cool/url?param=10&param2=nice')```
this one returns a router obj just like the one above
``` utils.toQueryString ```
takes a path and a search object ex:
``` utils.toQueryString('/some/cool/url',{param:10,param2:'nice') ``` it will spill the url used above

there are plans to extend utils to have functions similar to a traditional router
but more on the style of this router, my plan is to make it receive routes definitions and have them validated
so you could use this util on your middleware or your react app to aid in creating your routes.  
 
 ex: (prototype phase please give feedback)

```
utils.set('/abc')  
utils.set('/test/:foo/')
utils.set('/other/*',this.gui2);
```
those could also have a attached function, but i am not sure if that is usefull like utils.set('/abc',fn);  

then you could use it like this:
```
utils.get('/abc'); 
utils.get('/tes/some'); 
utils.get('/other/path/customer)
```
those could return true, a router obj, a perhaps a function you defined or some other winner idea you have.

you could use it like this:

if (utils.get('/abc')){
  return <SomeComponent>
}

### Universal Apps

redux-tiny-router has a initUniversal function, that returns a promise, this promise resolves with data.html (with the rendered app)
and data.state with your state, now just send those in and presto, redux-tiny-router handles async on react just fine as long as all 
async operations is done using actions , and that those actions ether return a promise or have an attribute that is a promise, you can 
even load data on componentWillMount on react applications, you also dont need to wait or synchronize any async operations, as the 
router will wait and re-render server side if on the first render some state change can occur, this makes the client receive the complete state of your app 

This example use a ejs template as its quite elegant for this, or you could just use a react component 
  
```
import createStore from '../your/path/create-store.js'; //(this should return a function that creates a store) 
import {reduxTinyRouter} from 'redux-tiny-router';
import Component from '../shared/components/Layout.jsx';


   reduxTinyRouter.initUniversal(url,createStore,Component).then((data)=>{
            res.render('index', {
                html: data.html,
                payload: JSON.stringify(data.state),
            });
        });
```
   
The ejs template: 

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Redux Tiny Universal Example</title>
  </head>
  <body>
    <div id="app"><%- html %></div>
    <script type="text/javascript">window.__DATA__ = <%- payload %>;</script>
    <script type="text/javascript" src="/build/bundle.js"></script> 
  </body>

</html>

```

And on the client:

```

import React from 'react';
import Layout  from '../shared/components/Layout.jsx'; //your react app
import createStore from '../shared/redux/create-store.js';

const store = createStore(window.__DATA__,window.location.href);

document.addEventListener('DOMContentLoaded', () => {
  React.render(<Layout store={store}/>,
      document.getElementById('app')
  );
});

```
And it works, the example universal app  [react-redux-tiny](https://github.com/Agamennon/react-redux-tiny)  can show you more! 


### Using client side OPTION2 (bing stuff by hand) if OPTION1 does not have issues this will be deprecated

Create your store with the redux-tiny-router middleware and reducer

```javascript
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

Inspired by cerebral reactive router

### License

MIT

