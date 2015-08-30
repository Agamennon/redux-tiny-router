import React from 'react';
import * as actions from '../actions/actions.js'

export class Link extends React.Component {

   static contextTypes = { store: React.PropTypes.any };

    click(e){
        e.preventDefault();
        this.context.store.dispatch(actions.rtrNavigateTo(this.props.path,this.props.search));
    }

    render() {
        return (
            <a onClick={this.click.bind(this)}>{this.props.children}</a>
        );
    }
}

