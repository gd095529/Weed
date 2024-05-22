import headerCss from '../styles/component/Header.module.css';
import logo from '../images/logo.png';
import search from '../images/mainImages/search.png';
import {useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setLogout} from "../redux/slice/loginSlice";

function Header() {
    const navigate = useNavigate();
    const name = '1234';
    const dispatch = useDispatch();
    
    const goLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    const goLogout = (e) => {
        e.preventDefault();
        dispatch(setLogout());

    }

    const getLogin = useSelector((state) => state.login);

    return(
        <div className={headerCss.body}>
            <div className={headerCss.logoBox}>
                <a href='/'><img src={logo} alt='북스커버리img'></img></a>
            </div>
            <div className={headerCss.optionsBox}>
                <div className={headerCss.searchADV}>
                    <img src={search} alt='검색img'></img>
                    <a href='/'><p>검색하기</p></a>
                </div>
                {getLogin.value &&  <div><p>{name}님</p></div>}
                <div className={headerCss.loginBox}>
                    {!getLogin.value && <a href='/' onClick={goLogin}>로그인</a>}
                    {getLogin.value && <a href='/' onClick={goLogout}>로그아웃</a>}
                </div>
            </div>
        </div>
    )
}

export default Header;