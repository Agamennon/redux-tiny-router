## Change log

#### 0.5.0 - 2015/09/07
- Router now keeps scroll position on routes
- New router and route react component (no nasting yet) chooses first route
- navigateTo action now has option parameter
- new option 'scroll' will scroll to least position on the route
- Link react component also updated to support option prop


#### 0.4.6 - 2015/09/07
- Pushstate will fallback to refresh if not available
- initUniversal now also accepts initial state


#### 0.4.4 - 2015/09/06
- redux 2.0
- scroll up on ROUTE_NAVIGATION, preserve scroll on back/forward (standard behaviour)
- renamed export rotuerActions to tinyActions  
- renamed export middleware to tinyMiddleware  
- and minor clean ups and documentation fix

#### 0.4.2 - 2015/09/04
- router.previous now holds the previous url
- navigateTo now has optional boolean parameter for silent navigation
- fix utils.check  

#### 0.4.0 - 2015/09/04
- removed paths and subpath from router
- Introduced route definitions
- utils have new functions  (set,setRoutes,match,check)
- Removed RTR_ prefixing from action creators and actions

#### 0.3.0 - 2015/09/01
- New store enhancer
- Router obj has more properties, (paths, subpath)
- new server side resolution
