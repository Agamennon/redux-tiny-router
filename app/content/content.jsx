import {Decorator as Cerebral} from 'cerebral-react-immutable-store';
import LeftPanel from  './leftPanel/leftPanel.jsx';
import RightPanel from  './rightPanel/rightPanel.jsx';
//import './content.scss';


@Cerebral({
   'mode':['mode'],
   'sideBarOpen':['sideBarOpen']
})
 class content extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {

        var content = classnames({
            content:true,
            mobile: this.props.mode === 'mobile',
            isOpen:this.props.mode === 'desktop' || this.props.sideBarOpen
        });
        let rightPanel = this.props.mode === 'desktop'? <RightPanel/> : null;

        return (
            <div className={content}>
                <LeftPanel/>
                <RightPanel/>
            </div>
        );
    }

}

export default content
