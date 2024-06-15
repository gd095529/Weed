import resultCss from '../styles/Result.module.css';
import Header1 from "../components/Header1";
import ListView1 from "../components/ListView1";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import {isBottom} from "../exportJS/scrollBottom";

function Result() {
    const [bookname, setBookname] = useState("");
    const [authors, setAuthors] = useState("");
    const [keyword, setKeyword] = useState("");
    const [resultText, setResultText] = useState("");
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const contentRef = useRef(null);

    // 내가 검색한 데이터임.
    const searchData = (bookname, authors, keyword) => {
        setBookname(bookname);
        setAuthors(authors);
        setKeyword(keyword);
    }

    useEffect(() => {
        updateResultText();
    }, [bookname, authors, keyword]);

    const updateResultText = () => {
        let result = "";
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
                setBookList(prevBooks => [...prevBooks, ...books]);

            } catch (error) {
                console.log(error);
            }
        }
        if (bookname || authors || keyword) {
            searchAPI();
        }
    }, [page, bookname, authors, keyword]);

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

    return (
        <div className={resultCss.body} >
            <div>
                <Header1 searchData={searchData}  />
            </div>
            <div className={resultCss.resultBox} ref={contentRef}>
                <div className={resultCss.resultName}>{resultText} 결과</div>
                {
                    bookList.map((book, index) => (
                        <div className={resultCss.listView}>
                        <ListView1 bookname={book.bookname} bookImgURL={book.bookImageURL} author={book.authors}
                                   publisher={book.publisher} description={book.description}  key={index} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Result;
