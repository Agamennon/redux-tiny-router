

function handleHashChange(hash){
    //http://stackoverflow.com/questions/25659960/how-can-i-execute-code-before-hashchange
     console.log('********************* HASH CHANGE *****************');

    return {
        type:'ROUTER_NAVIGATION',
        hash
    };
    //this.props.dispatch(actions.navigateToFromLink(hash));

}

function navigateTo(path,search){
//    console.log('action -> router.hash = '+router.hash);
    console.log(path,search);
    return {
        type:'ROUTER_NAVIGATE_TO',
        path,
        search

    }
}


module.exports = {
    handleHashChange:handleHashChange,
    navigateTo:navigateTo
};
