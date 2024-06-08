import findCss from "../styles/FindIdPwd.module.css";

function FindPwd() {
    return (
        <div>
            <div>
                <p>이메일</p>
                <input type={'email'}/>
            </div>
            <div>
                <p>아이디</p>
                <input type={'text'}/>
            </div>
            <div className={findCss.btn}>
                <p>비밀번호 찾기</p>
            </div>
        </div>
    )
}

export default FindPwd;