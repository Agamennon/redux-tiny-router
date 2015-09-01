import React from 'react';
import qs from 'query-string';
import * as actions from '../actions/actions.js'

export class Link extends React.Component {

   static contextTypes = { store: React.PropTypes.any };

    click(e){
         e.preventDefault();
         this.context.store.dispatch(actions.rtrNavigateTo(this.props.path,this.props.search));
    }

    render() {
         const { path, search, ...rest } = this.props;
         let href = `${path}`;
         if (search) href = href + `?${qs.stringify(search)}`;
         return (
            <a href={href} {...rest} onClick={this.click.bind(this)}>{this.props.children}</a>
         );
    }
}

