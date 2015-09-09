import React from 'react';
import qs from 'query-string';
import * as actions from '../actions/actions.js'
import {utils} from '../utils/utils.js';

class Null extends React.Component {
    render() {
        return null
    }
}
export class Router extends React.Component {
    static contextTypes = { store: React.PropTypes.any };
    render() {
        var routerUrl = this.context.store.getState().router.url;
        var validComponents = [];
        let {NotFound, ...rest } = this.props;


        function MapAndPush(children){
            var done = false;
            React.Children.forEach(children,(element,index)=>{
                    if (done) return;
                    let { path, url, component, ...rest } = element.props;
                    url = url || routerUrl;
                    if (utils.check(path,url)) {
                        done = true;
                        validComponents.push({
                            component,
                            rest
                        });

                    }
                }
            )}
        MapAndPush(this.props.children);
        var Root = NotFound;
        if (validComponents.length > 0) {
            Root = validComponents[0].component;
            Root.props = validComponents[0].rest;

        }
        return <Root {...Root.props}/>

    }
}
