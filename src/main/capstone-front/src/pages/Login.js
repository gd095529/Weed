import loginCss from '../styles/Login1.module.css';
import { ReactComponent as Logo} from "../images/logo2.svg";
import Input from '../components/Input';
/**
 * 아이디, 비밀번호로 로그인
 * 아이디 찾기, 비밀번호 찾기, 회원가입, 로그인 버튼
 * 로그인 상태 유지 넣을까 말까
 * 카카오톡 로그인, 네이버 로그인 넣을까 말까
 * input을 꾸미기 위해서 따로 컴포넌트로 만듦 (근데 생각해보니 거기 값을 어떻게 받아오지?..)
 * --> 넘길 값: type, placeholder, viewPlaceholder, url, url2
 */

function Login() {
    return(
        <div className={loginCss.body}>
            <div className={loginCss.titleBox}>
                <Logo width={'60%'} height={'30%'}/>
                <div>LOGIN</div>
            </div>
            <div className={loginCss.loginBox}>
                <div className={loginCss.id}>
                    <Input type={'text'} placeholder={'로그인을 입력하세요'} viewPlaceholder={'로그인'}
                           />
                </div>
                <div className={loginCss.pwd}>
                    <Input type={'password'} placeholder={'비밀번호를 입력하세요'} viewPlaceholder={'비밀번호'}
                           url={'https://cdn-icons-png.flaticon.com/512/6684/6684701.png'}
                           url2={'https://cdn-icons-png.flaticon.com/512/6405/6405909.png'}/>
                </div>
            </div>
            <div className={loginCss.extLoginBox}>

            </div>

        </div>
    )
}

export default Login;