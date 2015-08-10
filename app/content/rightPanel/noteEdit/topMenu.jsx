
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';


@Cerebral({
    selectedNote:['selectedNote']
})
class topMenu extends React.Component {

    constructor(props) {
        super(props);
        this.test = this.test.bind(this);
    }


    test(){
        window.location.hash = '/all';
      // this.props.signals.showNoteToggled();
    }

    render () {

        return (
            <div className='topMenu'>
                <button onClick={this.test}>Some Action</button>
            </div>
        );
    }

}

export default topMenu

