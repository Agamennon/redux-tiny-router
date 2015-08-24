import React from 'react';
import * as actions from '../actions/actions.js'

export class Link extends React.Component {

   static contextTypes = { store: React.PropTypes.any };

    click(e){
        e.preventDefault();
        console.log("i was clicqued dude!!!!!");
        console.log(this.context.store.dispatch(actions.navigateTo('/megazord',{gui:'legal'})));
    }

    render() {
     //   console.log(this.context);
        return (
            <a onClick={this.click.bind(this)}>{this.props.children}</a>
        );
    }
}


/*
<a onClick={this.click.bind(this)}>{this.props.children}</a>*/
