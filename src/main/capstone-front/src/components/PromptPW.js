import promptPW from "../styles/component/PromptPW.module.css";
import {useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function PromptPW({email}) {
    const pwdRef = useRef(null);
    const navigate = useNavigate();

    const changePwd =  async () => {
        const data = {
            email: email,
            password: pwdRef.current.value,
        }

        console.log(email, pwdRef.current.value);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        try {
            const response = await axios.post('/join/reset_password', data, config);
            alert(response.data);
            navigate("/login1");

        } catch (error) {
            console.log(error);
        }
    }

    const cancelPwd = () => {
        navigate('/', { replace: true });
        setTimeout(() => {
            navigate('/find/pwd');
        }, 0);
    }

    return (
        <div className={promptPW.fullBody}>
            <div className={promptPW.body}>
                <div className={promptPW.title}>변경할 비밀번호를 입력하세요!!</div>
                <input type={'password'} ref={pwdRef}/>
                <div>
                    <div className={promptPW.button} onClick={changePwd}>변경!</div>
                    <div className={promptPW.button} onClick={cancelPwd}>취소!</div>
                </div>
            </div>
        </div>
    )
}

export default PromptPW;