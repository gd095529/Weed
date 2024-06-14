import searchCss from '../styles/component/Search.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useRef} from "react";

function Search() {
    const navigate = useNavigate();

    const booknameR = useRef(null);
    const authorsR = useRef(null);
    const keywordR = useRef(null);

    const onClickBtn = () => {
        searchAPI();
    }

    async function searchAPI() {
        console.log(booknameR.current.value);
        console.log(authorsR.current.value);
        const config = {
            bookname: booknameR.current.value,
            authors: authorsR.current.value,
            keyword: keywordR.current.value,
        }

        try {
            const books = [];
            const response = await axios.get('/api/search', {params: config});
            console.log(response);
            navigate('/searchResult');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={searchCss.body}>
            <div className={searchCss.searchBox}>
                <input type={'text'} placeholder={'제목'} ref={booknameR}/>
                <input type={'text'} placeholder={'저자'} ref={authorsR}/>
                <input type={'text'} placeholder={'키워드'} ref={keywordR}/>
                <div onClick={onClickBtn}>검색하기</div>
            </div>
        </div>
    )

}

export default Search;