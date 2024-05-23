import { ReactComponent as Logo} from "../images/logo2.svg";
import { ReactComponent as Search} from "../images/mainImages/search.svg";
import { ReactComponent as Login} from "../images/mainImages/login.svg";
import profile from '../images/mainImages/profile1.png';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ShowInfo from "./ShowInfo";
import {useState} from "react";
import {setLogout} from "../redux/slice/loginSlice";
import logout from "../images/mainImages/logout.png";
import modify from '../images/mainImages/modify.png';

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

    const dispatch = useDispatch(); // 리덕스 export한거 쓸라고
    // 로그아웃
    const goLogout = () => {
        dispatch(setLogout());
        setGetLogin(false);
    }

    // Showinfo.js 컴포넌트를 다른 곳에서 재사용하기 위해서 굳이 이렇게 사용.
    const showInfoTag = () => {
        return (
            <>
                <div style={blockStyle} onClick={goLogout}>
                    <img src={logout} alt={'logout'} style={{width: '2rem', height: '2rem'}}/>
                    <p>로그아웃</p>
                </div>
                <div style={blockStyle} onClick={goLogout}>
                    <img src={modify} alt={'logout'} style={{width: '2rem', height: '2rem'}}/>
                    <p>정보 수정</p>
                </div>
            </>
        )
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
                    <ShowInfo getTag = {showInfoTag}/>
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

const blockStyle = {
    cursor: 'pointer',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginTop: '1rem',
    borderBottom: '1px solid white',
    paddingBottom: '0.5rem',
}

export default Header1;