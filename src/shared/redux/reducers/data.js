const initialState = '';

export default function data(state = initialState, action = {}) {
  switch (action.type) {
    case 'ROUTER_NAVIGATION':
     //   console.log('i have been called');
      // we could add an error message here, to be printed somewhere in our application
        if (action.pattern === '/hello?gui&leo'){
            console.log('hello gui leo');
            // console.log(action.router);

            return {
                pattern:action.pattern,
                ...state

            };
        }

      return {
        ...state,
        directory: action.router.path
      };
      case 'CLIENT_ACTION':
             console.log('i have been calleddddd');
          // we could add an error message here, to be printed somewhere in our application
          return {
              ...state,
              clientData: action.data
          };
    default:
      return state
  }
}
