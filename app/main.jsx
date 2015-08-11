import Sidebar from './sidebar/sidebar.jsx';
import Content from './content/content.jsx';
import './main.scss';

import controller from './controller/controller.js';
import  * as actions from './actions/actions.js';
import Router from './gui-router.js';
import Media from './gui-media.js';
//let injectTapEventPlugin = require("react-tap-event-plugin");
//injectTapEventPlugin();

import {Decorator as Cerebral} from 'cerebral-react-immutable-store';

controller.signal ('noteAdded',actions.addNote);
//controller.signal ('noteSelected',actions.selectNote, actions.toggleShowNote);
controller.signal ('noteSelected',actions.navigateToNote);
controller.signal ('showNoteToggled',actions.toggleShowNote);
controller.signal ('hamburgerClicked',actions.toggleSideBar);
controller.signal ('routeChange',actions.navigateTo);
controller.signal ('sideBarItemClick',actions.toggleSideBar,actions.navigateTo);
controller.signal ('notesClicked',actions.closeSideBar);
controller.signal ('modeChanged',actions.setAppMode,actions.closeSideBar);

@Cerebral({
    inputValue:['inputValue']
})
export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {


        return (
            <div className='app'>
                <Sidebar/>
                <Content/>
            </div>
        );
    }

}

//React.render(<App/>, document.body);

/*  toggleShowNote (args,state){
 const show =  state.get('showNote') || false;
 state.set('showNote',!show);
 },


 selectNote(args,state){
 //  const name = state.get('inputValue');
 const id = args.id;
 const note = state.get(['notes',id]);

 state.set(['selectedNote'],note);


 },*/


controller.signal('allRouted', function allRoute (args, state) {
    state.set(['router'], args.router);
    state.set('showNote',false);

  //  console.log(args.router);
});

controller.signal('noteRouted', function noteRoute (args, state) {
    state.set(['router'], args.router);
    state.set('showNote',true);
    const note = state.get(['notes',args.router.search.id]);
    state.set(['selectedNote'],note);
});

controller.signal('notebooksRouted', function notebooksRouted (args, state) {

    state.set(['router'], args.router);

});

controller.signal('tagsRouted', function tagsRouted (args, state) {
    state.set(['router'], args.router);

});

controller.signal('settingsRouted', function settingsRouted (args, state) {
    state.set(['router'], args.router);

});




var router = Router (
    {
        '/all':controller.signals.allRouted,
        '/all?id':controller.signals.noteRouted,
        '/notebooks':controller.signals.notebooksRouted,
        '/tags':controller.signals.tagsRouted,
        '/settings':controller.signals.settingsRouted

    }
    ,controller);

//window.location.assign('#/all');
controller.signals.routeChange({path:'/all'});

Media(controller);

React.render(controller.injectInto(App),document.body);
