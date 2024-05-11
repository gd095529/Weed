import headerCss from '../styles/component/Header.module.css';
import logo from '../images/logo.png';
import search from '../images/mainImages/search.png';
import {useNavigate } from 'react-router-dom';

function Header() {
    const naviagte = useNavigate();
    
    const goLogin = (e) => {
        e.preventDefault();
        naviagte('/login');
    }


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
                <div className={headerCss.loginBox}>
                    <a href='/' onClick={goLogin}>로그인</a>
                </div>
            </div>
        </div>
    )
}

export default Header;