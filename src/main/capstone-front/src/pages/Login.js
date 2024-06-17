import loginCss from '../styles/Login1.module.css';
import { ReactComponent as Logo} from "../images/logo2.svg";
import Input from '../components/Input';
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLogin} from "../redux/slice/loginSlice";
import {loginName} from "../redux/slice/loginName"
import Session from "react-session-api/src";

/**
 * 아이디, 비밀번호로 로그인
 * 아이디 찾기, 비밀번호 찾기, 회원가입, 로그인 버튼
 * 로그인 상태 유지 넣을까 말까
 * 카카오톡 로그인, 네이버 로그인 넣을까 말까
 * input을 꾸미기 위해서 따로 컴포넌트로 만듦 (근데 생각해보니 거기 값을 어떻게 받아오지?..) (받아옴)
 * --> 넘길 값: type, placeholder, viewPlaceholder, url, url2
 */

function Login() {
    const [userID, setUserID] = useState(null);
    const [userPwd, setUserPwd] = useState(null);

    const idValue = useRef(null);
    const pwdValue = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clickJoin = () => {
        navigate("/join1");
    }
    const clickFind = () => {
        navigate("/find/id");
    }
    const clickLogo = () => {
        navigate("/");
    }
    const clickLoginBtn = () => {
        loginAPI();
    }

    async function loginAPI() {
        try {
            const response = await axios.post('/login', {
                id: idValue.current.value,
                password: pwdValue.current.value,
                rememberId: true,
            },{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert('로그인 성공');
                console.log(response);
                dispatch(setLogin());
                dispatch(loginName(idValue.current.value));
                console.log(idValue.current.value);
                navigate(response.data);
                console.log("로그인 함 ㅎㅎ");
            }
        } catch (error) {
            alert('로그인에 실패하였습니다.');
        }
    }


    return(
        <div className={loginCss.body}>
            <div className={loginCss.box}>
                <div className={loginCss.titleBox} onClick={clickLogo}>
                    <Logo width={'80%'} height={'80%'} />
                    <div>LOGIN</div>
                </div>
                <div className={loginCss.loginBox}>
                    <div className={loginCss.id}>
                        <Input type={'text'} placeholder={'아이디를 입력하세요'} viewPlaceholder={'아이디'}
                                useRef={idValue}
                               />
                    </div>
                    <div className={loginCss.pwd}>
                        <Input type={'password'} placeholder={'비밀번호를 입력하세요'} viewPlaceholder={'비밀번호'}
                               url={'https://cdn-icons-png.flaticon.com/512/6684/6684701.png'}
                               url2={'https://cdn-icons-png.flaticon.com/512/6405/6405909.png'}
                            useRef={pwdValue}
                        />
                    </div>
                </div>
                <div className={loginCss.loginBtnBox}>
                    <div className={loginCss.loginBtn} onClick={clickLoginBtn}>로그인</div>
                </div>
                <div className={loginCss.optionBox}>
                    <div className={loginCss.joinBtn} onClick={clickJoin}>회원가입</div>
                    <div className={loginCss.findBtn} onClick={clickFind}>아이디/비밀번호 찾기</div>
                </div>
            </div>
        </div>
    )
}

export default Login;