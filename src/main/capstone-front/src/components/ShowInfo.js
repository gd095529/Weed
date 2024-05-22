import showInfoCss from '../styles/component/ShowInfo.module.css';
import logout from '../images/mainImages/logout.png';

function ShowInfo(props) {
    return (
        <div className={showInfoCss.body}>
            <div className={showInfoCss.triangle}></div>
            <div className={showInfoCss.block} onClick={props.goLogout}>
                <img src={logout} alt={'logout'} />
                <p>로그아웃</p>
            </div>
        </div>
    )
}

export default ShowInfo;