export function handleHashChange(hash){

    return {
        type:'ROUTER_NAVIGATION',
        hash
    };
}

export function vai(){

    return {
        type:'MERDA'

    };
}


export function navigateTo(path,search){
    return {
        type:'ROUTER_NAVIGATE_TO',
        path,
        search
    }
}

