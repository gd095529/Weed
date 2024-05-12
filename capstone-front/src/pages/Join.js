import joinCss from '../styles/Join.module.css';
import logo from '../images/logo.png';
import view from '../images/join/view.png';
import hide from '../images/join/hide.png';
import check from '../images/join/check.png';
import successCheck from '../images/join/successCheck.png';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Join() {
    const [checkEmali, setCheckEmail] = useState(true);
    const [isHide, setHide] = useState(true);
    const [checkLength, setCheckLength] = useState(false);
    const [checkAlphanumeric, setCheckAlphanumeric] = useState(false);
    const [isPwdFocus, setPwdFocus] = useState(false);

    const isEmail = (e) => {
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if(!email_regex.test(e.target.value)){
            return setCheckEmail(false);
        }else{
            return setCheckEmail(true);
        }
    }

    const clickHide = () => {
        setHide(!isHide);
    }

    const isPassword = (e) => {
        const pwdValue = e.target.value;
        const alpha = /[a-zA-Z]/;
        const num = /[0-9]/;
        setPwdFocus(false);

        if (pwdValue.length >= 8) {
            setCheckLength(true);
        } else {
            setCheckLength(false);
        }

        if (alpha.test(pwdValue) && num.test(pwdValue)) {
            setCheckAlphanumeric(true);
        } else {
            setCheckAlphanumeric(false);
        }
    }
    const navigate = useNavigate();
    const checkForm = () => {
        if (checkEmali && checkLength && checkAlphanumeric) {
            alert('성공적으로 완료되었습니다!');
            return navigate('/login');
        } else {
            alert('잘못된 부분이 있습니다. 다시 확인 해 주세요!');
        }

        return false;
    }



    return (
        <div className={joinCss.body}>
            <div className={joinCss.joinBox}>
                <div className={joinCss.logoBox}>
                    <img src={logo} alt='logoImg' />
                    <div>계정 만들기</div>
                </div>
                <div className={joinCss.joinFormBox}>
                    <div className={joinCss.emailBox}>
                        <input type='text' placeholder='이메일을 입력하세요.' onBlur={isEmail}/>
                        {!checkEmali &&<div className={joinCss.errorForm}>이메일 형식에 맞지 않습니다!</div>}
                    </div>
                    <div className={joinCss.passwordBox}>
                        <input type={isHide ? 'password' : 'text'} placeholder='비밀번호를 입력하세요.' onBlur={isPassword} onFocus={() => setPwdFocus(true)}/>
                        {isPwdFocus && <img src={isHide ? view : hide} alt='alt' onClick={clickHide}/> }
                    </div>
                    <div className={joinCss.passwordConditionBox}>
                        <div className={joinCss.length}>
                            <img src={checkLength ? successCheck : check} alt='img' />
                            <div>8글자 이상 입력</div>
                        </div>
                        <div className={joinCss.alphanumeric}>
                            <img src={checkAlphanumeric ? successCheck : check} alt='img'/>
                            <div>영문, 숫자 각 1개 이상 사용</div>
                        </div>
                    </div>
                </div>
                <div className={joinCss.joinBtn} onClick={checkForm}>
                    <p>회원가입</p>
                </div>
            </div>
        </div>
    )
}

export default Join;