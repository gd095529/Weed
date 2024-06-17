import findCss from "../styles/FindIdPwd.module.css";

function FindId() {



    return (
        <div>
            <div>
                <p>이메일</p>
                <input type={'email'} />
            </div>
            <div>
                <p>이름</p>
                <input type={'text'} />
            </div>
            <div className={findCss.btn}>
                <p>아이디 찾기</p>
            </div>
        </div>
    )
}

export default FindId;