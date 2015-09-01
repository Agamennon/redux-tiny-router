import * as qs from 'query-string'

var navindex = 0;
function toPattern (path,params){
    var patern = path;
    Object.keys(params).map(function(item,index,array){
        if (index === 0){
            patern = patern + '?'+item;
        } else{
            patern = patern + '&'+item;
        }
    });
    return patern;
}

function urlToRouter (url){
    var paths = url.split('/');
    paths = paths.splice(1,paths.length);
    paths[paths.length-1] = paths[paths.length-1].split('?')[0];
    var subPath = paths[paths.length-2];
    var lastPath = paths[paths.length-1].split('?')[0];
    var path = url.split('?')[0];
    if ((path.charAt(path.length-1) === '/') && (path.length > 1)){
        path = path.substr(0,path.length-1);  //remove ultimo caracter (o / )
    }
    var params = qs.parse(url.split('?')[1] || '') ;

    if (params.debug_session){
        delete params.debug_session
    }
    var router = {
        url,
        path,
        paths,
        subPath,
        lastPath,
        params
    };

    var pattern = toPattern(path,params);
    router.pattern = pattern;
    return router;

}

 function toQueryString (path,search){
    if (!search){
        return path
    }
    return path + '?'+ qs.stringify(search);
}

export default  {
    utils:{
    navindex,
    toPattern,
    urlToRouter,
    toQueryString
    }
}
