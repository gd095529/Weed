import loginCss from '../styles/Login1.module.css';
import { ReactComponent as Logo } from "../images/logo2.svg";
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/slice/loginSlice";
import { loginName } from "../redux/slice/loginName";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [userID, setUserID] = useState(null);
    const [userPwd, setUserPwd] = useState(null);

    const idValue = useRef(null);
    const pwdValue = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clickJoin = () => {
        navigate("/join1");
    };
    const clickFind = () => {
        navigate("/find/id");
    };
    const clickLogo = () => {
        navigate("/");
    };
    const clickLoginBtn = () => {
        loginAPI();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    async function loginAPI() {
        try {
            const response = await axios.post('/login', {
                id: idValue.current.value,
                password: pwdValue.current.value,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert('로그인 성공');
                dispatch(setLogin());
                dispatch(loginName(idValue.current.value));
                console.log(idValue.current.value);
                navigate(response.data);
            }
        } catch (error) {
            alert('로그인에 실패하였습니다.');
        }
    }

    return (
        <div className={loginCss.body}>
            <div className={loginCss.box}>
                <div className={loginCss.titleBox} onClick={clickLogo}>
                    <Logo width={'80%'} height={'80%'} />
                </div>
                <div className={loginCss.loginBox}>
                    <div className={loginCss.id}>
                        <TextField
                            label="아이디"
                            variant="outlined"
                            fullWidth
                            inputRef={idValue}
                        />
                    </div>
                    <div className={loginCss.pwd}>
                        <TextField
                            label="비밀번호"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            inputRef={pwdValue}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
                <div className={loginCss.loginBtnBox} onClick={clickLoginBtn}>
                    <div className={loginCss.loginBtn}>로그인</div>
                </div>
                <div className={loginCss.optionBox}>
                    <div className={loginCss.findBtn} onClick={clickFind}>아이디 / 비밀번호 찾기</div>
                </div>
                <div className={loginCss.optionBox}>
                    <div className={loginCss.joinBtn} onClick={clickJoin}>Bookscovery 처음이세요? 회원 가입</div>
                </div>
            </div>
        </div>
    )
}

export default Login;
