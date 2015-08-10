
import './sidebar.scss';
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';

@Cerebral({
    test:['test'],
    router:['router'],
    mode:['mode']
})
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state  = {collapse:false};
    }


    handleClick (){
        var collapse = !this.state.collapse;
        this.setState({collapse:collapse});
    }

    render () {

        var left = classnames({
            leftContent:true,
            collapse:this.state.collapse
        });


     //   const allClass = classnames({'active': (this.props.router.path === '/all')});

        return (
            <div className='sidebar'>
                <div className='title'>
                    <span>FossNote</span>
                </div>
                <ul className='nav'>
                    <li>
                        <a onClick={()=>{this.props.signals.sideBarItemClick()}} className={classnames({'active': (this.props.router.path === '/all')})} href="#/all">All notes</a>
                    </li>
                    <li>
                        <a onClick={()=>{this.props.signals.sideBarItemClick()}} className={classnames({'active': (this.props.router.path === '/notebooks')})} href="#/notebooks">Notebooks</a>
                    </li>
                    <li>
                        <a onClick={()=>{this.props.signals.sideBarItemClick()}} className={classnames({'active': (this.props.router.path === '/tags')})} href="#/tags">Tags</a>
                    </li>
                    <li>
                        <a onClick={()=>{this.props.signals.sideBarItemClick()}} className={classnames({'active': (this.props.router.path === '/settings')})} href="#/settings">Settings</a>
                    </li>
                </ul>
            </div>
        );
    }

}

export default Sidebar;

/*
<a onClick={this.handleClick} className='active'>All Notes</a>*/
