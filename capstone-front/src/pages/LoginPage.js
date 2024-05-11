import loginCss from '../styles/Login.module.css';
import logo from '../images/logo.png';
import { useState } from 'react';

function LoginPage() {
    const [isFocus, setFocus] = useState(false);

    return (
        <div className={loginCss.body}>
            <div className={loginCss.loginBox}>
                <div className={loginCss.logoBox}>
                    <img src={logo} alt='logoImg'/>
                    <div>로그인</div>
                </div>
                <div className={loginCss.inputBox}>
                    <input className={isFocus ? loginCss.focusInput : ''}  type='text' placeholder='이메일을 입력하세요.' onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} ></input>
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