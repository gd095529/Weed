import findCss from "../styles/FindIdPwd.module.css";
import {findID} from "../api/FindAPI";
import {useRef} from "react";

function FindId() {
    const email = useRef(null);
    const name = useRef(null);

    const find = async () => {
        const data = await findID(email.current.value, name.current.value);
        alert("당신의 ID는 " + data.data + "입니다");
    }

    return (
        <div className={findCss.body}>
            <div className={findCss.container}>

                <div className={findCss.card}>
                    <div className={findCss.field}>
                        <p>이메일</p>
                        <input type="email" ref={email} />
                    </div>
                    <div className={findCss.field}>
                        <p>이름</p>
                        <input type="text" ref={name} />
                    </div>
                    <div className={findCss.btn} onClick={find}>
                        <p>아이디 찾기</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindId;
