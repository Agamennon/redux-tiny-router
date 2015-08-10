import './leftPanel.scss';
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';

import Notes from './notes/notes.jsx';


@Cerebral({
    router:['router'],
    mode:['mode'],
    showNote:['showNote']
})
class leftPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {

    //    console.log(this.props.mode);
        var leftPanel = classnames({
            leftPanel:true,
            mobile:this.props.mode === 'mobile',
            showNote:this.props.showNote
        });


        let elm = this.props.router.path === '/all'?(<div><span>all</span></div>):(<div><span>tags</span></div>);

        return (
            <div className={leftPanel}>
                <Notes/>
            </div>
        );
    }

}

export default leftPanel



/*

import './leftpanel.bkp.scss';
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';

@Cerebral({
    router:['router'],
    notes:['notes']
})
class leftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
        this.noteClick = this.noteClick.bind(this);

    }
    handleClick (){

    }
    noteClick (id){
        //   console.log (id);
        this.props.signals.noteSelected({id:id});
    }

    renderNotes (){

        return  Object.keys(this.props.notes).map((note) => {
            let obj = this.props.notes[note];
            return (
                <div className='note' onClick={this.noteClick.bind(this,note)} key={note}>

                    <h3><span>{obj.title}</span></h3>
                    <hr/>
                    <span>{obj.text}</span>
                    <br/>
                </div>
            )
        });
    }

    render () {
        let elm = this.props.router.path === '/all'?(<div><span>all</span></div>):(<div><span>tags</span></div>);
        var theNotes = this.renderNotes();
        return (
            <div className='leftPanel'>
                <div className='topMenu'>

                    <a  style={{float:'left'}} onClick={this.handleClick} className='button'></a>
                    <span style={{float:'left'}}>   {elm} </span>
                    <button onClick={()=>{this.props.signals.noteAdded({ title: 'this is a supernote',text:'i just added this shit'})}}>Some Action</button>
                    <button onClick={()=>{console.log(this.props.notes)}}>Some Action</button>

                    <button>Some Action</button>
                </div>

                <div className='notes'>
                    {theNotes}
                </div>

            </div>
        );
    }

}

export default leftPanel*/
