import findCss from '../styles/FindIdPwd.module.css';
import {Routes, Route, useLocation} from "react-router-dom";
import FindId from "../components/FindId";
import {useNavigate} from "react-router-dom";
import FindPwd from "../components/FindPwd";
import {useState} from "react";
import { ReactComponent as Logo} from "../images/logo2.svg";

function Find() {
    const location = useLocation();
    const navigate = useNavigate();
    const [click, setClick] = useState(location.pathname);

    const clickFindId = () => {
        navigate('/find/id');
        setClick('/find/id');
    }

    const clickFindPwd = () => {
        navigate('/find/pwd');
        setClick('/find/pwd');
    }

    const clickLogo = () => {
        navigate("/");
    }

    const sendInvalid = (email, name, id) => {

    }

    const checkInvalid = (code) => {

    }

    return (
        <div className={findCss.body}>
            <Logo width={'60%'} height={'20%'} onClick={clickLogo}/>
            <div>
                <div className={findCss.header}>
                    <p onClick={clickFindId} style={{backgroundColor: click === '/find/id' ? '#a4c1fc' : ''}}>아이디 찾기</p>
                    <p onClick={clickFindPwd} style={{backgroundColor: click === '/find/pwd' ? '#a4c1fc' : ''}}>비밀번호 찾기</p>
                </div>
                <div className={findCss.findBox}>
                    <Routes>
                        <Route path={'id'} element={<FindId />}></Route>
                        <Route path={'pwd'} element={<FindPwd />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Find