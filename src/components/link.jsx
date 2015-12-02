var React = require('react');

import qs from 'query-string';
import * as actions from '../actions/actions.js'

export class Link extends React.Component {

   static contextTypes = { store: React.PropTypes.any };

    click(e){
         e.preventDefault();
         this.context.store.dispatch(actions.navigateTo(this.props.path,this.props.search,this.props.option));
    }

    render() {
         const { path, search, option, ...rest } = this.props;
         let href = `${path}`;
         if (search) href = href + `?${qs.stringify(search)}`;
         return (
            <a href={href} {...rest} onClick={this.click.bind(this)}>{this.props.children}</a>
         );
    }
}

