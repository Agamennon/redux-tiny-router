import React from 'react';
import qs from 'query-string';
import * as actions from '../actions/actions.js';
import {utils} from '../utils/utils.js';

export class Route extends React.Component {

    static contextTypes = { store: React.PropTypes.any };

    render() {
        let { path, url, component, ...rest } = this.props;
        url = url ? url : this.context.store.getState().router.url;
        var Response = (utils.check(this.props.path,url)) ? component: null;
        return <Resonse/>
    }
}

