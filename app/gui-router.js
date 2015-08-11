var qs = require('query-string');
const Router = function (routes,controller) {

    function setRouterState(args,state){
        state.set(['router'], args.router);
    }

    controller.signal('hashChange', setRouterState );


    var preventHashChangeEvent = false;
    var api = {
        setHash:function(hash){
            if (hash !== window.location.hash.slice(1)) {
                window.location.hash = hash;
            }
        },

        setHashSilent:function(hash){
       //     console.log(hash);
       //     console.log(window.location.hash.slice(1));
            if (hash !== window.location.hash.slice(1)) {
                preventHashChangeEvent = true;
                window.location.hash = hash;
            }
        },
        preventHashChange: function(){
            preventHashChangeEvent = true;
            window.history.back(); //move to previous state ,remove hash
        }
    };

    function parseHash (url){

        var path = url.split('?')[0];
        if ((path.charAt(path.length-1) === '/') && (path.length > 1)){
            path = path.substr(0,path.length-1);  //remove ultimo caracter (o / )
        }
        var search = url.split('?')[1] || '' ;
        return {
            hash:url,
            path:path,
            search:qs.parse(search)
        };
    }

    var matchRoutes = function (url) {
        var router =  parseHash(url);
        var patern = router.path;

        Object.keys(router.search).map(function(item,index,array){
             if (index === 0){
                 patern = patern + '?'+item;
             } else{
                 patern = patern + '&'+item;
             }
        });

        if (routes[patern]){
            routes[patern]({router:router});
            return false;
        }

      /*  if (routes[router.path]){
            routes[router.path]({router:router});
            return false;
        }*/
        return router;
    };

    function hashAuth(){
        //  return confirm("change hash?");
        return true
    }

    function doHashChange(url){

        const hash = url || location.hash.substr(1);
     //   console.log(hash);
        const router  = matchRoutes(hash);
      //  console.log(router);
        if (router !== false) {  //false quer dizer que o state vai ser resolvido pelo cliente caso contrario setamos router
            controller.signals.hashChange({router: router})
        }
    }


    doHashChange(location.hash.substr(1)||'/'); //caso o cara entre uma hash de cara (nao chama hash change)
    window.addEventListener('hashchange', function (e) { //http://stackoverflow.com/questions/25659960/how-can-i-execute-code-before-hashchange

        if (!preventHashChangeEvent)
            if (hashAuth())
                doHashChange();
            else
                api.preventHashChange();
        else
            preventHashChangeEvent = false;
    });

    controller.eventEmitter.on('change', function (state) { //links normais dentro nao vao funcionar
        api.setHash(state.router.hash);
    });


    controller.eventEmitter.on('remember', function (state) {
        api.setHashSilent(state.router.hash);
    });

    return api;

};


module.exports = Router;
