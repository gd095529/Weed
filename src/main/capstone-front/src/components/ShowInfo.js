import showInfoCss from '../styles/component/ShowInfo.module.css';
import logout from '../images/mainImages/logout.png';

function ShowInfo(props) {
    return (
        <div className={showInfoCss.body} style={{top: props.top, left: props.left}}>
            {/**<div className={showInfoCss.triangle}></div>*/}
            {props.getTag()}
        </div>
    )
}

export default ShowInfo;