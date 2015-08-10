var qs = require('query-string');
const Router = function (routes,controller) {


    function setRouterState(args,state){
    //    console.log('setting router state');
       // console.log(args.router);
        state.set(['router'], args.router);
    }


    function setBrowserHash(hash,silent){
        if (hash !== location.hash.substr(1)) {
            if (silent)
                preventHashChangeEvent = true;
            location.hash = hash; //set hash based on all router not only url
        }
    }


    controller.signal('hashChange', setRouterState );

    var matchRoutes = function (currentHash) {



        var path = currentHash.split('?')[0];
        if ((path.charAt(path.length-1) === '/') && (path.length > 1)){
            path = path.substr(0,path.length-1);  //remove ultimo caracter (o / )
        }
        var search = currentHash.split('?')[1] || '' ;
        var router = {
            hash:currentHash,
            path:path,
            search:qs.parse(search)
        };

        if (routes[path]){
      //      console.log('--------------- = '+path);
            routes[path]({router:router});
            return false;
        }

        return router;

    };


    function hashAuth(){
        //  return confirm("change hash?");
        return true
    }


    var preventHashChangeEvent = false;

    function doHashChange(e){
     //   console.log('doing hash change');
        const hash = location.hash.substr(1);
        const router  = matchRoutes(hash);
        if (router !== false) {
            controller.signals.hashChange({router: router})
        }
    }

    matchRoutes(location.hash.substr(1)||'/'); //caso o cara entre uma hash de cara (nao chama hash change)

    var api = {
        preventHashChange: function(e){
            preventHashChangeEvent = true;
      //      console.log('preventing hash change');
     //       e.preventDefault(); //prevent the default behaviour
            window.history.back(); //move to previous state ,remove hash
        }


    };

  /*  function preventHashChange(e){
        preventHashChangeEvent = true;
        console.log('preventing hash change');
        e.preventDefault(); //prevent the default behaviour
        window.history.back(); //move to previous state ,remove hash
    }
*/

    window.addEventListener('hashchange', function (e) { //http://stackoverflow.com/questions/25659960/how-can-i-execute-code-before-hashchange
      //  console.log('hashChange');
      //  console.log(preventHashChangeEvent);
        if (!preventHashChangeEvent)
            if (hashAuth())
                doHashChange(e);
            else
                api.preventHashChange(e);
        else
            preventHashChangeEvent = false;

    });


    controller.eventEmitter.on('remember', function (state) {
    //    console.log('remembering');
        setBrowserHash(state.router.hash,true);
    });

    return api;

};


module.exports = Router;
