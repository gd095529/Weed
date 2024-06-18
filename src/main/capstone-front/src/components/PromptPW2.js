import promptPW from "../styles/component/PromptPW.module.css";
import {useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function PromptPW2(props) {
    const pwdRef = useRef(null);
    const navigate = useNavigate();

    const changePwd =  async () => {
        props.putPassword(pwdRef.current.value);
    }

    const cancelPwd = () => {
        navigate('/', { replace: true });
    }

    return (
        <div className={promptPW.fullBody}>
            <div className={promptPW.body}>
                <div className={promptPW.title}>비밀번호를 입력하세요!</div>
                <input type={'password'} ref={pwdRef}/>
                <div>
                    <div className={promptPW.button} onClick={changePwd}>확인!</div>
                    <div className={promptPW.button} onClick={cancelPwd}>취소!</div>
                </div>
            </div>
        </div>
    )
}

export default PromptPW2;