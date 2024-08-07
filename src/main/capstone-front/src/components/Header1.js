import { ReactComponent as Logo} from "../images/logo2.svg";
import { ReactComponent as Search} from "../images/mainImages/search.svg";
import { ReactComponent as Login} from "../images/mainImages/login.svg";
import profile from '../images/mainImages/profile1.png';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ShowInfo from "./ShowInfo";
import {useEffect, useRef, useState} from "react";
import {setLogout} from "../redux/slice/loginSlice";
import logout from "../images/mainImages/logout.png";
import modify from '../images/mainImages/modify.png';
import star from '../images/mainImages/star.png';
import header1Css from '../styles/component/Header1.module.css';
import SearchComponent from "../components/Search";
import {logoutAPI} from "../api/logoutAPI";
import axios from "axios";
import memberGetout from '../images/memberGetout.png'
import PromptPW2 from "./PromptPW2";

function Header1(props) {
    const [isProfile, setIsProfile] = useState(false); // 프로파일을 클릭했는지 여부
    const [getLogin, setGetLogin] = useState(useSelector(state => state.login));
    const [searchFocus, setSearchFocus] = useState(false); // input text인거 클릭했냐 여부
    const [searchClick, setSearchClick] = useState(false);
    const searchRef = useRef(null);
    const [selectItem, setSelectItem] = useState('제목');
    const [searchValue, setSearchValue] = useState('');
    const [ID, setID] = useState(useSelector(state => state.loginID.value));
    const divRef = useRef(null);
    const [pwd, setPwd] = useState(null);

    const navigate = useNavigate();
    const onClickLogin = () => {
        navigate('/login1');
    }

    const goMember = () => {
        navigate('/member');
    }

    const onClickLogo = () => {
        navigate("/");
    }

    const moveBookmark = () => {
        navigate('/bookmark');
    }

    const onClickCustomSearch = () => {
        navigate("/customSearch");
    }

    const clickSearch = () => {
        setSearchClick(!searchClick);
    }

    // profile을 클릭했는지 설정
    const setProfile = () => {
        setIsProfile(!isProfile);
    }

    const dispatch = useDispatch(); // 리덕스 export한거 쓸라고
    // 로그아웃
    const goLogout = async () => {
        dispatch(setLogout());
        setGetLogin(false);
        await logoutAPI();
        console.log("로그아웃함");
        navigate("/");
    }

    const goMemberOut = async () => {
        navigate('/MemberOut');
    }

    // 검색창 눌렀을 때
    const focusSearch = () => {
        setSearchFocus(true);
    }

    const blurSearch = () => {
        setSearchFocus(false);
    }

    const clickItem = (event) => {
        setSelectItem(event.target.value);
    }

    const moveResult = () => {
        console.log(searchRef.current.value);
        setSearchValue(searchRef.current.value);
    }

    useEffect(() => {
        if (searchValue) {
            console.log("zz")
            move();
        }
    }, [searchValue]);

    const move = () => {
        console.log("z");
        navigate('/', { replace: true });
        setTimeout(() => {
            navigate('/searchResult', { state: { type: selectItem, value: searchValue } });
        }, 0);
    }


    const getDivWidth = () => {
        return divRef.current?.getBoundingClientRect().width;
    }

    const getDivBottom = () => {

        return divRef.current?.getBoundingClientRect().bottom;
    }

    const getDivLeft = () => {
        return divRef.current?.getBoundingClientRect().left;
    }

    // Showinfo.js 컴포넌트를 다른 곳에서 재사용하기 위해서 굳이 이렇게 사용.
    const showInfoTag = () => {
        return (
            <>
                <div className={header1Css.blockStyle} onClick={goLogout}>
                    <img src={logout} alt={'logout'} style={{width: '2rem', height: '2rem'}}/>
                    <p>로그아웃</p>
                </div>
                <div className={header1Css.blockStyle} onClick={goMember}>
                    <img src={modify} alt={'logout'} style={{width: '2rem', height: '2rem'}}/>
                    <p>정보수정</p>
                </div>
                <div className={header1Css.blockStyle} onClick={moveBookmark}>
                    <img src={star} alt={'logout'} style={{width: '2rem', height: '2rem'}}/>
                    <p>즐겨찾기</p>
                </div>
                <div className={header1Css.blockStyle} onClick={goMemberOut}>
                    <img src={memberGetout} alt={'logout'} style={{width: '2rem', height: '2rem'}}/>
                    <p>회원탈퇴</p>
                </div>
            </>
        )
    }

    const setSearchStyle = {
        border: searchFocus ? '1px solid #738AEB' : '1px solid black',
    }

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (query.length > 0) {
            axios.get('/search/suggestions', { params: { query } })
                .then(response => setSuggestions(response.data))
                .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            setSuggestions([]);
        }
    }, [query]);

    return (
        <div className={header1Css.bodyStyle} style={{marginTop: searchClick ? '20rem' : ''}}>
            {
                searchClick && <SearchComponent searchData = {props.searchData}  bookList = {props.bookList}/>
            }
            <div onClick={onClickLogo} >
                <Logo width={'15rem'} height={'6rem'} />
            </div>
            <div className={header1Css.searchBox} style={setSearchStyle}>
                <select onChange={(event) => clickItem(event)}>
                    <option value={'제목'}>제목</option>
                    <option value={'저자'}>저자</option>
                    <option value={'키워드'}>키워드</option>
                </select>
                <input type={'text'} placeholder={'검색'} onFocus={focusSearch} onBlur={blurSearch} ref={searchRef}
                    onChange={(e => setQuery(e.target.value))}
                />
                <Search width={'1.2rem'} height={'1.2rem'} onClick={moveResult} />
            </div>
            <div className={header1Css.namugeStyle}>
                <div className={header1Css.jungangStyle} onClick={onClickCustomSearch}>
                    <img src={'https://cdn-icons-png.flaticon.com/512/104/104113.png'} alt={'맞춤 검색'}
                        style={{width: '1.5rem', height: '1.5rem'}}
                    />
                    <p>맞춤 검색</p>
                </div>
                <div className={`${header1Css.jungangStyle}`} onClick={clickSearch}>
                    <Search width={'1.5rem'} height={"1.5rem"}/>
                    <p>상세검색</p>
                </div>
                { !getLogin.value &&
                    <div className={header1Css.jungangStyle} onClick={onClickLogin}
                         ref={divRef}>
                        <Login width={'1.5rem'} height={"1.5rem"}/>
                        <p>로그인</p>
                    </div>
                }
                {
                    getLogin.value &&
                    <div className={header1Css.jungangStyle} onClick={setProfile} ref={divRef}>
                        <img src={profile} alt={'pr'} style={{width: '1.5rem', height: '1.5rem'}}/>
                        <p>{ID}</p>

                    </div>
                }
                {
                    isProfile && getLogin.value &&
                    <ShowInfo getTag = {showInfoTag} top = {getDivBottom()} left = {getDivLeft() - 60}/>
                }
            </div>
        </div>
    )
}



export default Header1;