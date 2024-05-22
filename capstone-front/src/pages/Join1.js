import joinCss1 from '../styles/Join1.module.css';
import logo from '../images/logo2.png'

function Join1() {
    return (
        <div className={joinCss1.body}>
            <div className={joinCss1.head}>
                <img src={logo} alt={'a'}/>
                <p>회원가입</p>
            </div>
            <form className={joinCss1.context}>
                <div>
                    <p>이메일</p>
                    <input type={'email'}/>
                    <input type={'button'} value={'인증'} style={{marginLeft: '1rem'}}/>
                </div>
                <div>
                    <p>아이디</p>
                    <input type={'text'}/>
                </div>
                <div>
                    <p>비밀번호</p>
                    <input type={'password'}/>
                </div>
                <div>
                    <p>비밀번호 확인</p>
                    <input type={'password'}/>
                </div>
                <div>
                    <p>이름</p>
                    <input type={'email'}/>
                </div>
                <div>
                    <p>성별</p>
                    <input type={'email'}/>
                </div>
                <div>
                    <p>연령</p>
                    <input type={'email'}/>
                </div>
                <div>
                    <p>학과</p>
                    <input type={'email'}/>
                </div>
                <input type={'submit'} style={{margin: '0 auto', width: '100%'}}/>
            </form>
            <div></div>
        </div>
    )
}

export default Join1;