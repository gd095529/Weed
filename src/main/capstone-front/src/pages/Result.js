import resultCss from '../styles/Result.module.css';
import Header1 from "../components/Header1";
import ListView1 from "../components/ListView1";
import {useEffect, useState} from "react";

function Result() {
    const [bookname, setBookname] = useState("");
    const [authors, setAuthors] = useState("");
    const [keyword, setKeyword] = useState("");
    const [resultText, setResultText] = useState("");
    const [bookList, setBookList] = useState([]);

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

    const resultBook = (result) => {
        console.log("Received result: ", result); // 확인용 콘솔 로그 추가
        setBookList(result);
    }

    useEffect(() => {
        if (bookList.length > 0) {
            console.log("Updated book list: ", bookList);
        }
    }, [bookList]);

    return (
        <div className={resultCss.body}>
            <div>
                <Header1 searchData={searchData} bookList={resultBook} />
            </div>
            <div className={resultCss.resultBox}>
                <div className={resultCss.resultName}>{resultText} 결과</div>
                {
                    bookList.map((book, index) => (
                        <ListView1 bookname={book.bookname} bookImgURL={book.bookImageURL} author={book.authors}
                                   publisher={book.publisher} description={book.description}  key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Result;
