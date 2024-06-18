import searchCss from '../styles/component/Search.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import ModalPopup from "./ModalPopup";
import modalPopupCss from "../styles/component/ModalPopup.module.css";

function Search(props) {
    const navigate = useNavigate();

    const booknameR = useRef(null);
    const authorsR = useRef(null);
    const keywordR = useRef(null);
    const [keywords, setKeywords] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [popup, setPopup] = useState(false);
    const [keywordList, setKeywordList] = useState([]);
    const [selectKeyword, setSelectKeyword] = useState("");

    const onClickBtn = () => {
        props.searchData(booknameR.current.value, authorsR.current.value, keywordR.current.value);
        navigate('/searchResult');
    }



    const search = (event) => {
        setSearchText(event.target.value);

    }

    const onKeyPressSearch = (event) => {
        if (event.key === 'Enter') {
            setSearchText(event.target.value);
            setPopup(false);
            setPopup(false);
        }
    };

    const handleKeywordChange = (event) => {
        setSelectKeyword(event.target.value);
        if (event.key === 'Enter') {
        setPopup(false);
        }
    };

    const clickItem = (item) => {
        setSelectKeyword(item);
        setPopup(false);
    }

    useEffect(() => {
        async function fetchKeywords() {
            try {
                const response = await axios.get('/api/keyword');
                console.log(response);

                const fetchedKeywords = response.data.response.keywords.map(k => k.keyword.word);
                setKeywords(fetchedKeywords);
                setKeywordList(fetchedKeywords);
            } catch (error) {
                console.error('Error fetching keywords:', error);
            }
        }

        async function search() {
            if (searchText === '') {
                if (!popup) {
                    fetchKeywords();
                } else {
                    setKeywordList(keywords);
                }
            } else {
                const filter = keywords.filter(item =>
                    item.toLowerCase().includes(searchText.toLowerCase())
                );
                console.log(filter);
                setKeywordList(filter);
            }
        }

        search();
    }, [searchText]);

    const modalPopup = () => {
        return (
            <div className={modalPopupCss.body} style={{top: '100%'}} >
                <div className={modalPopupCss.popup}
                >
                    <div className={modalPopupCss.searchBox}>
                        <input className={modalPopupCss.search} type={'text'} placeholder={"키워드 검색"}
                               onChange={(event) => search(event)}
                               onKeyPress={(event) => handleKeywordChange(event)}
                        />
                    </div>
                    <div className={modalPopupCss.selectBox}>
                        {
                            keywordList.map((item, index) => (
                                <div key={index} onClick={() => clickItem(item)}>
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={searchCss.body}>
            {popup && modalPopup()}
            <div className={searchCss.searchBox}>
                <input type={'text'} placeholder={'제목'} ref={booknameR}/>
                <input type={'text'} placeholder={'저자'} ref={authorsR}/>
                <input
                    type={'text'}
                    placeholder={'키워드'}
                    ref={keywordR}
                    onClick={() => setPopup(true)}
                    value={selectKeyword}
                    onChange={handleKeywordChange} // Add onChange handler
                />
                <div onClick={onClickBtn}>검색하기</div>
            </div>
        </div>
    );

}

export default Search;