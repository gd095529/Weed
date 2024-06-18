import findCss from "../styles/FindIdPwd.module.css";

function FindId() {
    return (
        <div className={findCss.body}>
            <div className={findCss.container}>

                <div className={findCss.card}>
                    <div className={findCss.field}>
                        <p>이메일</p>
                        <input type="email" />
                    </div>
                    <div className={findCss.field}>
                        <p>이름</p>
                        <input type="text" />
                    </div>
                    <div className={findCss.btn}>
                        <p>아이디 찾기</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindId;
