import { ReactComponent as Logo} from "../images/logo2.svg";
import { ReactComponent as Search} from "../images/mainImages/search.svg";
import { ReactComponent as Login} from "../images/mainImages/login.svg";

function Header1() {
    return (
        <div style={bodyStyle}>
            <div>
                <Logo width={'15rem'} height={'6rem'}/>
            </div>
            <div style={namugeStyle}>
                <div style={jungangStyle}>
                    <Search width={'1.5rem'} height={"1.5rem"}/>
                    <p>검색</p>
                </div>
                <div style={jungangStyle}>
                    <Login width={'1.5rem'} height={"1.5rem"}/>
                    <p>로그인</p>
                </div>
            </div>
        </div>
    )
}

const bodyStyle = {
    width: '100%',
    height: '6rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #000000',
    overflow: 'hidden'
}

const namugeStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '2rem',
    height: '6rem'
}

const jungangStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'

}

export default Header1;