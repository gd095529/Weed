import resultCss from '../styles/Result.module.css';
import Header1 from "../components/Header1";
import ListView1 from "../components/ListView1";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import {isBottom} from "../exportJS/scrollBottom";
import {useLocation} from "react-router-dom";

function Result() {
    const [bookname, setBookname] = useState("");
    const [authors, setAuthors] = useState("");
    const [keyword, setKeyword] = useState("");
    const [resultText, setResultText] = useState("");
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const contentRef = useRef(null);
    const location = useLocation();

    // 내가 검색한 데이터임.
    const searchData = (bookname, authors, keyword) => {
        setBookname(bookname);
        setAuthors(authors);
        setKeyword(keyword);
        setPage(1);
    }

    useEffect(() => {
        updateResultText();
    }, [bookname, authors, keyword]);

    const updateResultText = () => {
        let result = "";
        let gandanSearch;

        try {
            if (!location || !location.state) {
                throw new Error('location or location.state is undefined');
            }
            const a = location.state.type; // 그냥 안들어가면 catch로 들어가라고 일부러 틀린 문장 줌

            gandanSearch = location?.state?.type;
            const gandanSearchValue = location?.state?.value;
            console.log(gandanSearchValue);

            result = `${gandanSearch === undefined ? '' : gandanSearch}(으)로 ${gandanSearchValue === undefined ? '' : gandanSearchValue} 검색`;
            switch (gandanSearch) {
                case '제목':
                    setBookname(gandanSearchValue === undefined ? '' : gandanSearchValue);
                    break;
                case '저자':
                    setAuthors(gandanSearchValue === undefined ? '' : gandanSearchValue);
                    break;
                case '키워드':
                    setKeyword(gandanSearchValue === undefined ? '' : gandanSearchValue);
                    break;
            }
            setResultText(result);
            return;
        } catch (error) {

        }

        if (bookname.length > 0) {
            result = bookname;
        }
        if (authors.length > 0) {
            result = result.length === 0 ? authors : `${result} AND ${authors}`;
        }
        if (keyword.length > 0) {
            result = result.length === 0 ? keyword : `${result} AND ${keyword}`;
        }
        setResultText(result);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight + 10) {
                setPage(prevPage => prevPage + 1);
                console.log("aa");
                console.log("innerHeight:" + window.innerHeight);
                console.log("scrollY:" + window.scrollY);
                console.log("offsetHeight:" + document.body.offsetHeight);
                console.log("document.scrollHeight: " + document.documentElement.scrollHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        async function searchAPI() {
            const config = {
                bookname: bookname,
                authors: authors,
                keyword: keyword,
                pageNo: page
            }
            console.log(bookname);

            try {
                const books = [];
                const response = await axios.get('/api/search', {params: config});

                for (let i = 0; i < response.data.response.docs.length; i++) {
                    books.push(response.data.response.docs[i].doc);
                }
                if (page === 1) {
                    setBookList(books);
                } else {
                    setBookList((prev) => [...prev, ...books]);
                    console.log(bookList);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (bookname || authors || keyword) {
            searchAPI();
        }
    }, [page, bookname, authors, keyword]);

    return (
        <div className={resultCss.body} >
            <div>
                <Header1 searchData={searchData}  />
            </div>
            <div className={resultCss.resultBox} ref={contentRef}>
                <div className={resultCss.resultName}>{resultText}</div>
                {
                    bookList.map((book, index) => (

                        <ListView1 bookname={book.bookname} bookImgURL={book.bookImageURL} author={book.authors}
                                   isbn={book.isbn13}
                                   publisher={book.publisher} description={book.description}  key={index} />

                    ))
                }

            </div>
        </div>
    )
}

export default Result;
