import React from 'react';
//import { createStore, combineReducers } from 'redux';
//import * as reducers from '../../shared/redux/reducers/index';
import createStore from '../../shared/redux/create-store.js';
//import {reduxRouter} from '../../shared/redux/router/router';
var reduxTinyRouter = require ('../../shared/redux/router/index.js').reduxTinyRouter;


import Layout from '../../shared/components/Layout.jsx';




export default (req, res, next) => {


  // Payload needed for Redux (rendering) and sending to client.
//  const payload = { data: req.path };

   const production = !__DEVELOPMENT__;
   var {state,store} = reduxTinyRouter.initUniversal(req.headers.host+req.url,createStore);

   //var store = createStore(state,'http://'+req.headers.host+req.url,true);
  // const store = createStore({},'http://'+req.headers.host+req.url,req);
 /*  store.dispatch({
       type:'ROUTER_NAVIGATION',
       hash:'i am the guy with the guy'
   });*/
   //var payload =  store.getState();
  //const location = new Location(req.path, req.query); //get location some other way
  //console.log(req);

   //console.log(payload);

  let html = React.renderToString(<Layout store={store}/>);

      res.render('index', {
          html: html,
          payload: JSON.stringify(state),
          production:production
      });


 }
