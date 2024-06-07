import { ReactComponent as Logo} from "../images/logo2.svg";
import { ReactComponent as Search} from "../images/mainImages/search.svg";
import { ReactComponent as Login} from "../images/mainImages/login.svg";
import profile from '../images/mainImages/profile1.png';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ShowInfo from "./ShowInfo";
import {useState} from "react";
import {setLogout} from "../redux/slice/loginSlice";
import logout from "../images/mainImages/logout.png";
import modify from '../images/mainImages/modify.png';
import star from '../images/mainImages/star.png';
import header1Css from '../styles/component/Header1.module.css';

function Header1() {
    const [isProfile, setIsProfile] = useState(false); // 프로파일을 클릭했는지 여부
    const [getLogin, setGetLogin] = useState(useSelector(state => state.login));
    const [searchFocus, setSearchFocus] = useState(false); // input text인거 클릭했냐 여부
    const navigate = useNavigate();
    const onClickLogin = () => {
        navigate('/login');
    }

    // profile을 클릭했는지 설정
    const setProfile = () => {
        setIsProfile(!isProfile);
    }

    const dispatch = useDispatch(); // 리덕스 export한거 쓸라고
    // 로그아웃
    const goLogout = () => {
        dispatch(setLogout());
        setGetLogin(false);
    }
    // 검색창 눌렀을 때
    const focusSearch = () => {
        setSearchFocus(true);
    }

    const blurSearch = () => {
        setSearchFocus(false);
    }

    // Showinfo.js 컴포넌트를 다른 곳에서 재사용하기 위해서 굳이 이렇게 사용.
    const showInfoTag = () => {
        return (
            <>
                <div className={header1Css.blockStyle} onClick={goLogout}>
                    <img src={logout} alt={'logout'} style={{width: '2rem', height: '2rem'}}/>
                    <p>로그아웃</p>
                </div>
                <div className={header1Css.blockStyle} onClick={goLogout}>
                    <img src={modify} alt={'logout'} style={{width: '2rem', height: '2rem'}}/>
                    <p>정보 수정</p>
                </div>
                <div className={header1Css.blockStyle} onClick={goLogout}>
                    <img src={star} alt={'logout'} style={{width: '2rem', height: '2rem'}}/>
                    <p>즐겨찾기</p>
                    {/**굳이 즐겨찾기 페이지가 필요할까? 라는 고민
                     그냥 메인에 "즐겨찾기"용으로 만들어 두고 거기로 이동시킬 지 고민
                     일단 나중에*/}
                </div>
            </>
        )
    }

    const setSearchStyle =  {
        border: searchFocus ? '1px solid #738AEB' : '1px solid black',
    }

    return (
        <div className={header1Css.bodyStyle}>
            <div>
                <Logo width={'15rem'} height={'6rem'}/>
            </div>
            <div className={header1Css.searchBox} style={setSearchStyle}>
                <select>
                    <option>제목</option>
                    <option>저자</option>
                    <option>키워드</option>
                </select>
                <input type={'text'} placeholder={'검색'} onFocus={focusSearch} onBlur={blurSearch}/>
                <Search width={'1.2rem'} height={'1.2rem'} />
            </div>
            <div className={header1Css.namugeStyle}>
                <div className={header1Css.jungangStyle}>
                    <img src={'https://cdn-icons-png.flaticon.com/512/104/104113.png'} alt={'맞춤 검색'}
                        style={{width: '1.5rem', height: '1.5rem'}}
                    />
                    <o>맞춤 검색</o>
                </div>
                <div className={`${header1Css.jungangStyle}`}>
                    <Search width={'1.5rem'} height={"1.5rem"}/>
                    <p>상세검색</p>
                </div>
                { !getLogin.value &&
                    <div className={header1Css.jungangStyle} onClick={onClickLogin}>
                        <Login width={'1.5rem'} height={"1.5rem"}/>
                        <p>로그인</p>
                    </div>
                }
                {
                    getLogin.value &&
                    <div className={header1Css.jungangStyle} onClick={setProfile}>
                        <img src={profile} alt={'pr'} style={{width: '1.5rem', height: '1.5rem'}}/>
                        <p>YourID</p>
                    </div>
                }
                {
                    isProfile && getLogin.value &&
                    <ShowInfo getTag = {showInfoTag}/>
                }
            </div>
        </div>
    )
}



export default Header1;