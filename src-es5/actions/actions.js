

function handleHashChange(hash){
    return {
        type:'ROUTER_NAVIGATION',
        hash:hash
    };
    //this.props.dispatch(actions.navigateToFromLink(hash));

}

function navigateTo(path,search){
    console.log(path,search);
    return {
        type:'ROUTER_NAVIGATE_TO',
        path:path,
        search:search

    }
}


module.exports = {
    handleHashChange:handleHashChange,
    navigateTo:navigateTo
};
