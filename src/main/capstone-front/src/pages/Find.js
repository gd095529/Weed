import findCss from '../styles/FindIdPwd.module.css';
import {Routes, Route} from "react-router-dom";
import FindId from "../components/FindId";
import {useNavigate} from "react-router-dom";
import FindPwd from "../components/FindPwd";
import {useState} from "react";
import { ReactComponent as Logo} from "../images/logo2.svg";

function Find() {
    const navigate = useNavigate();
    const [click, setClick] = useState('id');

    const clickFindId = () => {
        navigate('/find/id');
        setClick('id');
    }

    const clickFindPwd = () => {
        navigate('/find/pwd');
        setClick('pwd');
    }

    return (
        <div className={findCss.body}>
            <Logo width={'60%'} height={'20%'}/>
            <div>
                <div className={findCss.header}>
                    <p onClick={clickFindId} style={{backgroundColor: click === 'id' ? '#a4c1fc' : ''}}>아이디 찾기</p>
                    <p onClick={clickFindPwd} style={{backgroundColor: click === 'pwd' ? '#a4c1fc' : ''}}>비밀번호 찾기</p>
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