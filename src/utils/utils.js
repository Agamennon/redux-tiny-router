import * as qs from 'query-string'
//var qs = require('query-string');

var unfulfilled = 0;
var navindex = 0;


function unfull()
{
    return new function(){
       var unfull = 0;
       return {
           incUnfull: ()=>{
               unfull++;
           },
           decUnfull: ()=>{
               unfull--
           },
           getUnfull: ()=>{
               return unfull
           },
           setUnfull: (val)=>{
               unfull = val;
           }
       }
    };
}

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
        params,
        allow:true
    };

    var pattern = toPattern(path,params);
    router.pattern = pattern;
    return router;

}



  function parseHash  (hash){
    var path = hash.split('?')[0];
    if ((path.charAt(path.length-1) === '/') && (path.length > 1)){
        path = path.substr(0,path.length-1);  //remove ultimo caracter (o / )
    }
    var search = qs.parse(hash.split('?')[1] || '') ;
    if (search.debug_session){
        delete search.debug_session
    }
    var router = {
        hash,
        path,
        search
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





 function toQueryString (path,search){
    return path + '?'+ qs.stringify(search);
}

export default  {
    utils:{
    unfulfilled,
    navindex,
    toPattern,
    urlToRouter,
    parseHash,
    getPattern,
    toQueryString
    }
}
