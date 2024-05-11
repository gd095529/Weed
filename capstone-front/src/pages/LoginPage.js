import loginCss from '../styles/Login.module.css';
import logo from '../images/logo.png';
import { useState } from 'react';
import enter from '../images/enter.png';

function LoginPage() {
    const [isFocus, setFocus] = useState(false);

    const checkValue = (e) => {
        if (e.target.value == 0) {
            setFocus(false);
        } else {
            setFocus(true);
        }
    }
    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            checkLogin();
        }
    }
    const checkLogin = () => {
        return alert('가입되지 않은 정보입니다');
    }
    return (
        <div className={loginCss.body}>
            <div className={loginCss.loginBox}>
                <div className={loginCss.logoBox}>
                    <img src={logo} alt='logoImg'/>
                    <div>로그인</div>
                </div>
                <div className={loginCss.inputBox}>
                    <p style={{opacity: isFocus ?  '0.6' : '0'}}>이메일 입력</p>
                    <input className={isFocus ? loginCss.focusInput : ''}  type='email' placeholder='이메일을 입력하세요.' onFocus={() => setFocus(true)} onBlur={checkValue} onKeyPress={pressEnter}></input>
                    <img src={enter} alt='엔터'  style={{opacity: isFocus ? '1' : '0'}} onClick={checkLogin}/>
                </div>
                <div className={loginCss.buttonBox}>
                    <div className={loginCss.planeText}>계정이 없으신가요?</div>
                    <div className={`${loginCss.button}`}>회원가입</div>
                </div>
            </div>
        </div>
    )
} 

export default LoginPage;