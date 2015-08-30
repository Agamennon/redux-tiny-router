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
