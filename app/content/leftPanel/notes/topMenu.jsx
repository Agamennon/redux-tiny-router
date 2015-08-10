
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';


@Cerebral({
    mode:['mode']

})
class topMenu extends React.Component {
    constructor(props) {
        super(props);
        this.hamburgerClick = this.hamburgerClick.bind(this);
        this.test = this.test.bind(this);
    }

    test(){

    }

    hamburgerClick (){
        this.props.signals.hamburgerClicked();
    }

    render () {
        var hamburger = this.props.mode === 'mobile'? <a  style={{float:'left'}} onClick={this.hamburgerClick} className='button'></a> : null;
        //var hamburger = <a  style={{float:'left'}} onClick={this.hamburgerClick} className='button'></a>;
        return (
            <div className='topMenu'>
                {hamburger}

                <button style={{marginLeft:'20px'}} onClick={()=>{this.props.signals.noteAdded({ title: 'this is a supernote',text:'i just added this shit'})}}>Some Action</button>
                <button onClick={this.test}>Some Action</button>

            </div>
        )
    }

}

export default topMenu

/*

<button style={{marginLeft:'20px'}} onClick={()=>{this.props.signals.noteAdded({ title: 'this is a supernote',text:'i just added this shit'})}}>Some Action</button>
<button onClick={()=>{console.log(this.props.notes)}}>Some Action</button>

*/
