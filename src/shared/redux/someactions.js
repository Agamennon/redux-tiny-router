
export function someAction(info){
    //http://stackoverflow.com/questions/25659960/how-can-i-execute-code-before-hashchange
    console.log('********************* HASH CHANGE *****************');

    return {
        type:'SOME_ACTION',
        info
    };

    //this.props.dispatch(actions.navigateToFromLink(hash));

}

export function someAction2(info){
    //http://stackoverflow.com/questions/25659960/how-can-i-execute-code-before-hashchange
    console.log('********************* HASH CHANGE *****************');

    return {
        type:'SOME_ACTION',
        info
    };

    //this.props.dispatch(actions.navigateToFromLink(hash));

}
