import React from 'react';
import {App} from './App.jsx';
import { Provider } from 'react-redux'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';


export default class Layout extends React.Component {
    render() {
         let reduxDebugger = (__DEVELOPMENT__ && __DEBUG__ && __CLIENT__)  ?
            <DebugPanel  top right bottom>
                <DevTools store={this.props.store} monitor={LogMonitor}/>
            </DebugPanel> :null;

        return (
            <div>
                <Provider store={this.props.store}>
                    { () =>  <App/> }
                </Provider>
                {reduxDebugger}

            </div>
        );
    }
}
