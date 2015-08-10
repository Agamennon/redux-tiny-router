
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';


class note extends React.Component {
    constructor(props) {
        super(props);
        this.noteClick = this.noteClick.bind(this);

    }
    noteClick (id){
        this.props.signals.noteSelected({id:id});
        //window.location.hash = '/all?id='+id;
  //      location.hash = '/all?id='+id;
    }

    render () {

        const note = this.props.note;
        return (
            <div className='note' onClick={this.noteClick.bind(this,this.props.id)} key={this.props.id}>
                <h3><span>{note.title}</span></h3>
                <hr/>
                <span>{note.text}</span>
                <br/>
            </div>
        )
    }

}

export default note

