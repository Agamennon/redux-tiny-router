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

```javascript
import {routerActions} from 'redux-tiny-router'
//navigates to a route with optional search object
dispatch(routerActions.navigateTo('/somepath', {message:1}));
```

The router will navigate to (/somepath?message=1) and set the router object with the info, for that it fires an action `type:'ROUTER_NAVIGATION'`
that you can use to intercept the action on your middleware and do all sorts of interesting thinks, more later...

Some more cool actions:

 ```javascript
 preventNavigation(); //bonus! call this with a string and will prevent the user from navigating away from the page too!
 ```
 
Does what it says (it also blocks forward and back), after you call this you lock navigation, useful if the user is on a form and you want to warn him about pending changes,
if the user attempts to navigate, it fires and action `type:PREVENTED_NAVIGATION_ATTEMPTED` that will set a field in your router with
the attempted route, you actually don't need to worry about this, you can just check on your app if the value on the router.attemptedOnPrevent 
contains a value (this value is the attempted url) in this case you can show a pop-up warning the user of pending changes.
But what if the users whats to navigate away?

 ```javascript
  doPreventedNavigation();
 ```
You call this action!, it will read the value from router.attemptedOnPrevent and navigate there! (it handles back and forward buttons just fine)

```javascript
 allowNavigation();
```
That just allows navigation again. if you want to handle the navigate after confirm implementation yourself.
 
 
### Basic routing

You could just do this, inside your react app,

```javascript
@connect((state ) => {  
    return {
        router:state.router
     }
})
const Comp = React.createClass({
  render() {
    switch (this.props.router.path) {
        case '/':
            return <Home/>;
        case '/other':
            return <Other/>
        default:
            return <NotFound/>;
    }
  }
});

```

The basic idea is this, no more controller components, its just state, the reducer in redux-tiny-router, will feed your state
with a router object that represent all the nuances of the url automatically

### What do i get in this router object?

for an url like `some/cool/path?name=gui`

```javascript

 "router": {
      "url": "/some/cool/path?name=gui",
      "src": null,
      "splat": null,
      "params": {},
      "path": "/some/cool/path",
      "paths": [
        "/",
        "some",
        "cool",
        "path"
      ],
      "query": {
        "name": "gui"
      }
    }

```

The `url` property hold the exact url you see in the browser, `src`, `splat`, and `params` will only have a value if
you specify some route configuration (more on this later) if your routes are not too complicated you will have no need 
for those, `path` it's the url minus the query string  `?name=gui` in this example, `paths` is an array with all individual elements
and `query` holds the query string turned into a object.
 
You are free to use any of those to decide what component you will render in your app, so this brings the "controlling" 
back to your app.
  
  
### Configuring routes, in case you need it
  
redux-tiny-router internally uses a slightly modified version of a tiny route matching library called [http-hash](https://github.com/Matt-Esch/http-hash) 
with that you can choose to define some routes, those definitions will populate the router object `src` `splat` and `params` properties,
lets take a look:

First bring into your project the router utils, naturally configure your routes before you need'em

```javascript

import {utils} from 'redux-tiny-router';

//this will configure a route (the second part of the path will be a parameter called test)
//This matches /foo/<anything> but "/"  it will match /foo/somestuf but will not match /foo/somestuff/morestuff
utils.set('/foo/:test/')

```

If you navigate to `/foo/cool`  the router now knows, since you configured a matching route, how to populate `src`,
in this case it will be set to `/foo/:test/` src hold what pattern was matched with the url, this is quite useful 
for your react app to decide what to render (examples later...) `params` will have the object containing the route params,
in this case `{test:cool}`, splat will be `null`. **The router does not care if the url matches the route, if it does not,
you just don't get values for `src` `params` and `splat`. Think about route definitions as teaching the router how to extract 
extra information that you need.** 

What is a splat? well its the wild-card *, lest add another route definition.   
  
```javascript

//this will map to /test/<anything> but "/">/<anything> ... 
utils.set('/foo/:test/*')    


```   
   
Let's trow `/foo/some/long/stuff` as a url, now `src` will be `/foo/:test/*` params `{test:some}`
and splat `/long/stuff` (splat is anything that came after the `*`)   
  
 
For convenience you can use `utils.setRoutes` pass an array of definitions to set them all with one call:

```javascript

utils.setRoutes([
  '/foo/:test/',
  '/foo/:test/*'
  ...
  ...
  ...
]);

```

A more specific definition have precedence over a broad definition so `/foo/something` in the above definitions 
could match both route definitions, but `src` will be set to `/foo/:test/` as its more specific. (the order of route definitions does not matter).   
 
 
I told you that `src` is useful, well any pace of state from router can be useful but `src` is specially cool
lets look of how to use this in a react app (nesting routes):
 
Consider the url `/foo/some/more` 

```javascript

//before...
utils.setRoutes([
    '/',
    '/foo/*',
    '/foo/some'
]);

const Comp = React.createClass({
  render() {
    switch (this.props.router.src) {  //looking at src property
        case '/':
            return <Home/>;
        case '/foo/*': 
            return <Foo/>
        case '/foo/some':  //this have to be here as a more specific route like /foo/some  would be matched here (src would = '/foo/some') 
             return <Foo/> 
        default:
            return <NotFound/>;
    }
  }
});

```

Foo  could be:

```javascript

const Foo = React.createClass({
  render() {
    switch (this.props.router.splat) {  //notice SPLAT
        case '/some':
            return <Some/>
        case '/some/more'
            return <More/>
        default:
            return <NotFound/>;
    }
  }
});

```
 
That would render `</More>` Just remember that this example is somewhat arbitrary, in this case you don't even "need" to define routes, you could have used 
`router.paths[1]` on Comp  and `router.paths[2]` on Foo, like so:


```javascript

const Comp = React.createClass({
  render() {
    var paths =  this.props.router.paths;
    if (paths[0] === '/') return <Home/>
    if (paths[1] === '/foo') return <Foo/>
    return <NotFound/>
  }
});


```
  
on Foo 
  
```javascript

const Foo = React.createClass({
  render() {
    var paths =  this.props.router.paths;
    if (paths[3] === 'some') return <Some/>
    if (paths[4] === 'more') return <More/>
    return <NotFound/>
  }
});


``` 

Remember route definitions only add more details, you can use any peace of state you need and any javascript knowledge you have to render your app,
but just to give you yet more power, to guarantee you can do anything i could think of, have a look at this puppy `utils.match(definition,url)`, this util will return a full router obj using a on the fly route definition, if the url match the definition
you also get, `src` `splat` and `params`, so you could without adding previous route definitions make a one time check on `src` for even more flexibility.
Think about it, in the first example i had to add another case for the more specific route (because i added it) is an artificial problem but will help to illustrate.

```javascript
  
const Comp = React.createClass({
  render() {
    const url =  this.props.router.url;
    const match = utils.match;
    if (match('/',url).src) return <Home/>  //.src have a value with the url matches the definition
    if (match('/foo/*',url).src) return <Foo/> 
    return <NotFound/>
  }
});


```

  on Foo, we are not going to use `utils.match` instead we will use `utils.check`, match returns an 
  object with all those state things, you can use utils.check, it returns a boolean, if the only thing 
  you need is to check if the url matches a definition (that is our case on both components!)
  
 
```javascript

const Foo = React.createClass({
  render() {
    const url =  this.props.router.url;
    const check = utils.check;
    if (check('/some',url)) return <Foo/>
    if (check('foo/some/more/stuff/*',url)) return <Stuff/>
    if (check('/some/more',url)) return <Home/>
    return <NotFound/>
  }
});

 
``` 

### Understanding how react-tiny-router works
 
When the user enters a url on the browser, presses the back or forward buttons, or the navigateTo action creator is called,
redux-tiny-router will dispatch an action:

 
```javascript
{ 
 type:ROUTER_NAVIGATION,
 router:router
 ...
}
```

The router property already contains a populated router object, when this action reaches the router middleware, at the end of the middleware chain,
it will read the action.router.url property and set the browser with that url, it will then reach the router reducer, that will make router part of the state. 
It's quite simple really, but now that you know this, its easy to create a middleware to intercept this action.   
 
inside you middleware..
 
```javascript
  var url = action.router.url;
  
  switch (){
  case 'ROUTER_NAVIGATION':
      const isSecurePlace = utils.check('/secure/*',url);
      const loggedIn = getState().user
      if (isSecurePlace && !loggedIn){
         dispatch(routerActions.navigateTo('/login'));  //navigate to /login
         return   // this will stop further ROUTER_NAVIGATION processing, the action it will never reach the router middleware or the reducer
      }
      return next(action)
  }
``` 
 
In there, is business as usual, you could naturally dispatch your own actions with part of the router state,
to your own part of the state and point your app there if you want, dispatch actions based on some part of the
router state to fetch some data or whatever, you can even do redirects differently , by calling `utils.urlToRouter(url)` 
it returns a new router object based on the url you feed it, now place that on action.router and send it forward `next(action)`
and you are done, you could of course just dispatch a navigateTo action and not return next(action) as we did on the example above, 
just showing how you can monkey around in your reducer, as this router works in a redux flow and its just state, you 
have plenty of opportunity to interact.


You could do your all your routing just by looking at the router or your "own" state, fetch data in the middleware or in your component,
the router does not care...


### The utils
the same utils the router uses you can use it too
import {utils} from 'react-tiny-router';
the ones are:

Returns a router object:
 
```javascript
utils.urlToRouter('/some/cool/url?param=10&param2=nice')
```

Takes a path and a search object, returns a query string:

```javascript
 utils.toQueryString('/some/cool/url',{param:10,param2:'nice') //it will spill the url used above
``` 

Set a route definition

```javascript
 utils.set('/*') 
```
 
Sets a bunch of route definitions

```javascript
utils.setRoutes([
'/*',
'/foo',
]),

```
 
Returns a router object, also sets this router object with route definitions if it matches

```javascript
utils.match('/foo',url);
```

Returns true if the url matches the definition false otherwise

```javascript
utils.check('/foo',url);
```


### Universal Apps

redux-tiny-router has a initUniversal function, that returns a promise, this promise resolves with data.html (with the rendered app)
and data.state with your state, now just send those in and presto, redux-tiny-router handles async on react just fine as long as all 
async operations are done using actions , and that those actions ether return a promise or have an attribute that is a promise, you can 
even load data on componentWillMount on react applications, you also don't need to wait or synchronize any async operations, as the 
router will wait and re-render server side if on the first render, async actions where fired modifying the state,
this makes the client receive the complete state of your app 

This example use a ejs template as its quite elegant for this, or you could just use a react component 
  
```javascript
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

```javascript

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


### Using client side OPTION2 (bring stuff by hand) if OPTION1 is robbing you of applyMiddleware form a third party or you combine your reducers in a fancy way

Create your store with the redux-tiny-router middleware and reducer

```javascript
import { createStore, applyMiddleware, combineReducers} from 'redux';
import { middleware as reduxTinyRouterMiddleware, reducer as reduxTinyRouterReducer } from 'redux-tiny-router';
import * as yourReducers from './reducers'

  var reducer  = combineReducers(Object.assign({},reduxTinyRouterReducer,yourReducers));
  // reduxTinyRouterMiddleware needs to come after your middleware if you want to enable things like stopping routes on your middleware
  var finalCreateStore = applyMiddleware(appMiddleware,reduxTinyRouterMiddleware)(createStore); 
  store = finalCreateStore(reducer,{});
```

Standard stuff, for now you just added a middleware and a reducer from redux-tiny-router, you should turn this in to a function
that returns the store  that you can import for convenience and if you plan on doing an Universal app 

Now you only have to call the init function with the store before you render your app:

```javascript
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
