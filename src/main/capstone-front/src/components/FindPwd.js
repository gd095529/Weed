import findCss from "../styles/FindIdPwd.module.css";
import {useRef, useState} from "react";
import {findPW} from "../api/FindAPI";
import PromptPW from "./PromptPW";

function FindPwd() {
    const email = useRef(null);
    const name = useRef(null);
    const id = useRef(null);
    const [status, setStatus] = useState(0);

    const find = async () => {
        const data = await findPW(email.current.value, name.current.value, id.current.value);
        setStatus(data.status);
    }

    return (

        <div className={findCss.body}>
            {
                status === 200 && <PromptPW email = {email.current.value}/>
            }
            <div className={findCss.container}>
                <div className={findCss.card}>
                    <div className={findCss.field}>
                        <p>이메일</p>
                        <input type="email" ref={email}/>
                    </div>
                    <div className={findCss.field}>
                        <p>이름</p>
                        <input type="text" ref={name}/>
                    </div>
                    <div className={findCss.field}>
                        <p>아이디</p>
                        <input type="text" ref={id}/>
                    </div>
                    <div className={findCss.btn} onClick={find}>
                        <p>비밀번호 찾기</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindPwd;
