import findCss from '../styles/FindIdPwd.module.css';
import {Routes, Route} from "react-router-dom";
import FindId from "../components/FindId";
import {useNavigate} from "react-router-dom";
import FindPwd from "../components/FindPwd";

function Find() {
    const navigate = useNavigate();

    const clickFindId = () => {
        navigate('/find/id');
    }

    const clickFindPwd = () => {
        navigate('/find/pwd');
    }

    return (
        <div className={findCss.body}>
            <div className={findCss.header}>
                <p onClick={clickFindId}>아이디 찾기</p>
                <p onClick={clickFindPwd}>비밀번호 찾기</p>
            </div>
            <div className={findCss.findBox}>
                <Routes>
                    <Route path={'id'} element={<FindId />}></Route>
                    <Route path={'pwd'} element={<FindPwd />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Find