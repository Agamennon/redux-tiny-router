import * as qs from 'query-string'
import HttpHash from 'http-hash'

var navindex = 0;
var scrollpos = {};
var hash = HttpHash();

function getInfo  (url,hashObj=hash){
    return hashObj.get(url.split('?')[0]);
}

function set(url){
    hash.set(url);
}

function setRoutes(routes) {
    for (let x in routes) {
        hash.set(routes[x]);
    }
}

function _doMatching(mapping,url){
    let tmpHash = HttpHash();
    tmpHash.set(mapping);
    var hashResult = getInfo(url,tmpHash);
    let router = urlToRouter(url);
    router.src = hashResult.src;
    router.splat = hashResult.splat;
    router.params = hashResult.params;
    return router;
}

function match(mapping,url) {
    return _doMatching(mapping,url);
}

function check(mapping,url) {
    return (_doMatching(mapping,url).src);
}


function urlToRouter (url){
    var path = url.split('?')[0];
    var paths = path.split('/');
    paths[0] = paths[0] || '/';
    var last = (paths[paths.length-1]);
    if (last.length < 1) {
        paths = paths.splice(0,paths.length-1);
    }

    if ((path.charAt(path.length-1) === '/') && (path.length > 1)){
        path = path.substr(0,path.length-1);  //remove ultimo caracter (o / )
    }
    var query = qs.parse(url.split('?')[1] || '') ;

    if (query.debug_session){
        delete query.debug_session
    }

    var hash = getInfo(url);

    return  {
        url,
        src:hash.src,
        splat:hash.splat,
        params:hash.params,
        path,
        paths,
        query
    };

}

function toQueryString (path,query){
    if (!query){
        return path
    }
    return path + '?'+ qs.stringify(query);
}

export default  {
    utils:{
        scrollpos,
        navindex,
        set,
        setRoutes,
        match,
        check,
        urlToRouter,
        toQueryString
    }
}
