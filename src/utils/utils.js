import {default as qs} from 'query-string'
//var qs = require('query-string');

function parseHash  (hash){
    var path = hash.split('?')[0];
    if ((path.charAt(path.length-1) === '/') && (path.length > 1)){
        path = path.substr(0,path.length-1);  //remove ultimo caracter (o / )
    }
    var search = hash.split('?')[1] || '' ;
    var router = {
        hash,
        path,
        search:qs.parse(search)
    };
    var pattern = getPattern(router);
    router.pattern = pattern;
    return router;

}

function getPattern (routerObj){
    var patern = routerObj.path;
    Object.keys(routerObj.search).map(function(item,index,array){
        if (index === 0){
            patern = patern + '?'+item;
        } else{
            patern = patern + '&'+item;
        }
    });
    return patern;
}

function  toQueryString (path,search){
    return path + '?'+ qs.stringify(search);
}

export default {
    utils:{
    parseHash,
    getPattern,
    toQueryString
    }
}