import loginCss from '../styles/Login.module.css';
import logo from '../images/logo.png';
import { useState } from 'react';
import enter from '../images/enter.png';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLogin} from "../redux/slice/loginSlice";
import hide from '../images/join/hide.png';
import view from '../images/join/view.png';

function LoginPage() {
    const navigate = useNavigate(); // 다른 페이지로 이동할 때 사용하는 navigate
    const [isFocus, setFocus] = useState(false); // input 태그에 포커스가 맞춰져 있는지 확인
    const [Email, setEmail] = useState(null); //
    const [isShowPwd, setIsShowPwd] = useState(false); // 비밀번호를 보여줄 것인지 여부
    // redux 사용
    // login이 되면 전역변수로 login이 성공됨을 알림
    const dispatch = useDispatch();
    const login = () => {
        dispatch(setLogin());
        return navigate('/');
    }

    // input 태그에 포커스가 맞춰진 지 체크하는 용도.
    // 단, 안에 글자가 채워져 있으면 포커스는 유지함.
    const checkValue = (e) => {
        if (e.target.value === '') {
            setFocus(false);
        } else {
            setFocus(true);
        }
    }
    // 엔터 버튼을 누르면 로그인이 실행
    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            checkLogin();
        }
    }
    // DB 없으니 로그인 성공 조건
    const checkLogin = () => {
        if (Email === '1234') {
            return login();
        }
        return alert('가입되지 않은 정보입니다');
    }

    const showPwd = () => {
        setIsShowPwd(!isShowPwd);
    }

    // 회원가입으로 이동
    const goJoin = () => {
        navigate('/join');
    }

    return (
        <div className={loginCss.body}>
            <div className={loginCss.loginBox}>
                <div className={loginCss.logoBox}>
                    <img src={logo} alt='logoImg'/>
                    <div>로그인</div>
                </div>
                <div className={loginCss.inputBox}>
                    <p style={{opacity: isFocus ? '0.6' : '0'}}>아이디 입력</p>
                    <input className={isFocus ? loginCss.focusInput : ''} type='text' placeholder='아이디를 입력하세요.'
                           onFocus={() => setFocus(true)} onBlur={checkValue} onKeyPress={pressEnter}
                           onChange={(e) => setEmail(e.target.value)}></input>
                    <img src={enter} alt='엔터' style={{opacity: isFocus ? '1' : '0'}} onClick={checkLogin}/>
                </div>
                <div className={loginCss.inputBox}>
                    <p style={{opacity: isFocus ? '0.6' : '0'}}>비밀번호 입력</p>
                    <input className={isFocus ? loginCss.focusInput : ''} type={isShowPwd ? 'text' : 'password'} placeholder='비밀번호를 입력하세요.'
                           onFocus={() => setFocus(true)} onBlur={checkValue} onKeyPress={pressEnter}
                           onChange={(e) => setEmail(e.target.value)}></input>
                    <img src={isShowPwd ? hide : view} alt='엔터' style={{opacity: isFocus ? '1' : '0'}} onClick={showPwd}/>
                </div>
                <div className={loginCss.buttonBox}>
                    <div className={loginCss.planeText}>계정이 없으신가요?</div>
                    <div className={`${loginCss.button}`} onClick={goJoin}>회원가입</div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;