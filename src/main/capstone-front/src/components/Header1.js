import { ReactComponent as Logo} from "../images/logo2.svg";
import { ReactComponent as Search} from "../images/mainImages/search.svg";
import { ReactComponent as Login} from "../images/mainImages/login.svg";
import profile from '../images/mainImages/profile1.png';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ShowInfo from "./ShowInfo";
import {useState} from "react";
import {setLogout} from "../redux/slice/loginSlice";

function Header1() {
    const [isProfile, setIsProfile] = useState(false); // 프로파일을 클릭했는지 여부
    const [getLogin, setGetLogin] = useState(useSelector(state => state.login));
    const navigate = useNavigate();
    const onClickLogin = () => {
        navigate('/login');
    }

    // profile을 클릭했는지 설정
    const setProfile = () => {
        setIsProfile(!isProfile);
    }

    const dispatch = useDispatch(); // 리덕스 export한거
    // 로그아웃
    const goLogout = () => {
        dispatch(setLogout());
        setGetLogin(false);
    }

    return (
        <div style={bodyStyle}>
            <div>
                <Logo width={'15rem'} height={'6rem'}/>
            </div>
            <div style={namugeStyle}>
                <div style={jungangStyle}>
                    <Search width={'1.5rem'} height={"1.5rem"}/>
                    <p>검색</p>
                </div>
                { !getLogin.value &&
                    <div style={jungangStyle} onClick={onClickLogin}>
                        <Login width={'1.5rem'} height={"1.5rem"}/>
                        <p>로그인</p>
                    </div>
                }
                {
                    getLogin.value &&
                    <div style={jungangStyle} onClick={setProfile}>
                        <img src={profile} alt={'pr'} style={{width: '1.5rem', height: '1.5rem'}}/>
                        <p>아이디</p>
                    </div>
                }
                {
                    isProfile && getLogin.value &&
                    <ShowInfo goLogout = {goLogout}/>
                }
            </div>
        </div>
    )
}

const bodyStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #000000',
    overflow: 'hidden'
}

const namugeStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '2rem',
    height: '6rem',
}

const jungangStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer'
}

export default Header1;