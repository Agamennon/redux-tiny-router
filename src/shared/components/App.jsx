import React from 'react';
import { connect } from 'react-redux'
import sa from 'superagent';
import {routerActions} from '../redux/router'
//var routerActions = require('../redux/router/index.js').routerActions;
import * as otherActions from '../redux/someactions.js';

var a = Object.assign(routerActions,otherActions);

if (__CLIENT__) {
    require('./layout.scss');
}

@connect((state ) => {
    return {
        data:state.data
    }
})
export class App extends React.Component {


    navigateTo (){
        this.props.dispatch(a.navigateTo('/hello', {gui:'eu',leo:'legal'}));
    }

    action(){
        this.props.dispatch({
            type:'CLIENT_ACTION',
            data:'this was set by the client'
        });
    }

    logout(){
        sa.post('/api/logout').send({index:1,text:'guilherme'}).end(function(saErr,saRes){
            console.log('api login');
            if (saErr){
                console.log(saErr);
                console.log('from error');
            }
            else{
                console.log(saRes.body);
                console.log('from data');
            }

        });
    }

    login (){
        sa.post('/api/login').send({index:1,text:'guilherme'}).end(function(saErr,saRes){
            if (saErr){
                console.log(saErr);
                console.log('from error');
            }
            else{
                console.log(saRes.body);
                console.log('from data');
            }

        });
    }

    getData(){
        console.log('i was clicked dudddde');

        sa.post('/api/data').send({index:1,text:'guilherme'}).end(function(saErr,saRes){
            if (saErr){
                console.log(saErr);
                console.log('from error');
            }
            else{
                console.log(saRes);
                console.log('from data');
            }

        });
        /*  fetch('/api/data').then(function(response){
         if (response.status >= 400) {
         console.log(respose.status);
         throw new Error("Bad response from server");
         }
         console.log(response.json());
         return response.json();
         }).then(function(data){
         console.log(data)
         });*/
    }

    componentDidMount () {


        /*    fetch('/api/data').then(function(response){
         if (response.status >= 400) {
         console.log(respose.status);
         throw new Error("Bad response from server");
         }
         console.log(response.json());
         return response.json();
         }).then(function(data){
         console.log(data)
         });*/
    }


    render() {

        var state = JSON.stringify(this.props.data, null, 2);

        return (
            <div>
                <h1>hello motherfuckers</h1>
                <button onClick={this.action.bind(this)}> action </button>
                <button onClick={this.login.bind(this)}> login </button>
                <button  onClick={this.getData.bind(this)}> get data </button>
                <button  onClick={this.logout.bind(this)}> logout </button>
                <button  onClick={this.navigateTo.bind(this)}> navigateTo </button>
            <pre>
                redux state = {state}
            </pre>
            </div>
        );
    }
}

/*

 <h1>{this.props.data} hello motherfuckers</h1>
 <button onClick={this.login.bind(this)}> login </button>
 <button  onClick={this.getData.bind(this)}> get data </button>
 <button  onClick={this.logout.bind(this)}> logout </button>
 <pre key='fuck you'>
 redux state = { JSON.stringify(this.props.data, null, 2) }
 </pre>*/
