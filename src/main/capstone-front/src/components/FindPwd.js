import findCss from "../styles/FindIdPwd.module.css";

function FindPwd() {
    return (
        <div className={findCss.body}>
            <div className={findCss.container}>

                <div className={findCss.card}>
                    <div className={findCss.field}>
                        <p>이메일</p>
                        <input type="email" />
                    </div>
                    <div className={findCss.field}>
                        <p>아이디</p>
                        <input type="text" />
                    </div>
                    <div className={findCss.btn}>
                        <p>비밀번호 찾기</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindPwd;
