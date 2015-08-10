
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';
import TopMenu from './topMenu.jsx';

@Cerebral({
    selectedNote:['selectedNote']
})
class noteEdit extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        var note = this.props.selectedNote || {text:'no notes selected'};
        return (

            <div>
                <TopMenu/>
                <div >{note.text}</div>

            </div>
        );
    }

}

export default noteEdit

