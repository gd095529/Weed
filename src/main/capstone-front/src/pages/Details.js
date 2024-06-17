import detalisCss from '../styles/details.module.css';
import Header1 from "../components/Header1";
import ListView from "../components/ListView";
import noMark from '../images/mainImages/noMark.png';
import yesMark from '../images/mainImages/yesMark.png';
import {useEffect, useState} from "react";
import LineChart from "../exportJS/lineChart";
import WordCloudComponent from "../exportJS/WordCloud";
import {useLocation, useNavigate} from "react-router-dom";
import {detailAPI} from "../api/detailAPI";
import {maniaAPI} from "../api/maniaAPI";
import {readerAPI} from "../api/readerAPI";
import axios from "axios";
import {fetchFavoriteAPI} from "../api/favoriteAPI";
import {fetchFavoriteAddAPI} from "../api/favoriteAddAPI";
import {fetchFavoriteDelAPI} from "../api/favoriteDelAPI";
import {booksAPI} from "../api/booksAPI";
import {sessionMIDAPI} from "../api/sessionMIDAPI";
import {sessionDIDAPI} from "../api/sessionDIDAPI";

function Details() {
    const location = useLocation();

    const [bookData, setBookData] = useState(null);
    const [bookLoanData, setBookLoanData] = useState([]);
    const [bookKeyword, setBookKeyword] = useState([]);
    const [mania, setMania] = useState([]);
    const [reader, setReader] = useState([]);
    const [favorites_id, setFavorites_id] = useState('');
    const [books_id, setBooks_id] = useState('');
    const [isMark, setMark] = useState(null);
    const isbn = location.state.isbn;
    const navigate = useNavigate();
    const [sessionMID, setSessionMID] = useState('');
    const [sessionDID, setSessionDID] = useState('');

    useEffect(() => {
        const fetchID = async () => {
            try {
                const mID = await sessionMIDAPI();
                const dID = await sessionDIDAPI();

                setSessionMID(mID);
                setSessionDID(dID);
            } catch (err) {
                console.log(err);
            }
        }

        fetchID()
    }, []);

    useEffect(() => {
        const fetchDetail = async () => {
            const config = {
                member_id: sessionMID ? sessionMID : 1,
                department_id: sessionDID ? sessionDID : 1 // 세션에서 가져오기
            };
            console.log(sessionDID + "이것이 바로 세션 디펄트먼트 아이디");
            try {
                const data = await detailAPI(isbn, config);
                console.log("디테일불러오는 거");
                console.log(data);
                setBookData(data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }

        };

        fetchDetail();
    }, []);



    useEffect(() => {
        if (bookData) {
            const fetchLoanData = () => {
                const loanHistory = bookData.loanHistory.map(item => ({
                    x: item.loan.month,
                    y: item.loan.loanCnt
                }));
                setBookLoanData(loanHistory);
            };

            fetchLoanData();
        }
    }, [bookData]);

    useEffect(() => {
        if (bookData) {
            const fetchKeyword = () => {
                const keyword = bookData.keywords.map(item => ({
                    text: item.keyword.word,
                    value: item.keyword.weight * 10 + 5
                }));
                setBookKeyword(keyword);
            };

            fetchKeyword();
        }
    }, [bookData]);

    useEffect(() => {
        const fetchMania = async () => {

            try {
                const data = await maniaAPI(isbn);
                setMania(data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchMania();
    }, []);

    useEffect(() => {
        const fetchReader = async () => {

            try {
                const data = await readerAPI(isbn);
                setReader(data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchReader();
    }, []);

    const clickMark = () => {
        if (isMark === null) {
            setMark(true);
        }
        setMark(!isMark);
        // 함수 부르는 거 한 박자씩 늦어서 이렇게 해 둠
        if (isMark) {
            alert('즐겨찾기에서 제거하였습니다!');
        } else {
            alert('즐겨찾기에 추가하였습니다!');
        }
    }

    useEffect(() => {
        const addFavorite = async (bookId) => {
            try {
                const data = await fetchFavoriteAddAPI(bookId);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        const deleteFavorite = async (favoriteId, bookId) => {
            try {
                const data = await fetchFavoriteDelAPI(favoriteId, bookId);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (isMark) {
            addFavorite(books_id);
        } else if (isMark === false) {
            deleteFavorite(favorites_id, books_id);
        }

    }, [isMark]);

    useEffect(() => {
        const book = async () => {
            try {
                const data = await booksAPI(isbn);

                console.log(data);
                setFavorites_id(data.favorite_id);
                setBooks_id(data.book_id);

                setMark(data.favorite_id === null ? null : true);

                console.log(favorites_id + "id");
                console.log(books_id + "bId");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        book();
    }, []);

    // 동기적으로
    useEffect(() => {
        if (favorites_id !== null && books_id !== null) {
            console.log(favorites_id + " id");
            console.log(books_id + " bId");
        }
    }, [favorites_id, books_id]);

    const moveDetail = (isbn) => {
        console.log(isbn + "isbn");
        navigate('/', { replace: true });
        setTimeout(() => {
            navigate('/detail', { state: { isbn: isbn } });
        }, 0);
    }

    return (
        <div className={detalisCss.body}>
            <div className={detalisCss.header}>
                <Header1 />
            </div>
            {bookData && (
                <div className={detalisCss.context}>
                    <p>
                        {bookData.book.bookname}
                        <img src={isMark ? yesMark : noMark} alt={'1'} onClick={clickMark} />
                    </p>

                    <div>
                        <img src={bookData.book.bookImageURL} alt={''} />
                        <table border={'1px solid black'}>
                            <tr>
                                <td>저자정보</td>
                                <td colSpan={'5'}>{bookData.book.authors}</td>
                            </tr>
                            <tr>
                                <td>출판사</td>
                                <td colSpan={'5'}>{bookData.book.publisher}</td>
                            </tr>
                            <tr>
                                <td>책소개</td>
                                <td colSpan={'5'}>{bookData.book.description}</td>
                            </tr>
                            <tr>
                                <td>출판연월</td>
                                <td colSpan={'1'}>{bookData.book.publication_year}</td>
                                <td>ISBN</td>
                                <td colSpan={'3'}>{bookData.book.isbn13}</td>
                            </tr>
                            <tr>
                                <td>Vol</td>
                                <td>{bookData.book.vol}</td>
                                <td>주제분야</td>
                                <td>{bookData.book.class_nm}</td>
                                <td>총 대출건수</td>
                                <td>{bookData.book.loanCnt}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            )}
            {bookLoanData && (
                <div className={detalisCss.loan}>
                    <p>대출 추이</p>
                    <div>
                        <p className={detalisCss.chartName}>chart</p>
                        <div className={detalisCss.chart}><LineChart data={bookLoanData} /></div>
                    </div>
                    <div className={detalisCss.dataName}>데이터</div>
                    <table border={'1'} className={detalisCss.dataTable}>
                        <tr>
                            <td>대출연월</td>
                            <td>대출건수</td>
                            <td>대출순위</td>
                        </tr>
                        {
                            bookData && (
                                bookData.loanHistory.map((book, index) => (
                                    <tr key={index}>
                                        <td>{book.loan.month}</td>
                                        <td>{book.loan.loanCnt}</td>
                                        <td>{book.loan.ranking}</td>
                                    </tr>
                                ))
                            )
                        }
                    </table>
                </div>
            )}
            {bookData && (
                <div className={detalisCss.manyLoan}>
                    <p>다대출 이용자 그룹</p>
                    <p>최근 30일동안 대출을 가장 많이 한 연령 및 성별을 제공합니다</p>
                    <table border={'1'} className={detalisCss.dataTable}>
                        <tr>
                            <td>연령</td>
                            <td>성별</td>
                            <td>대출건수</td>
                            <td>순위</td>
                        </tr>
                        {
                            bookData && (
                                bookData.loanGrps.map((book, index) => (
                                    <tr key={index}>
                                        <td>{book.loanGrp.age}</td>
                                        <td>{book.loanGrp.gender}</td>
                                        <td>{book.loanGrp.loanCnt}</td>
                                        <td>{book.loanGrp.ranking}</td>
                                    </tr>
                                ))
                            )
                        }
                    </table>
                </div>
            )}
            {bookData && (
                <div className={detalisCss.keyword}>
                    <p>주요 키워드</p>
                    <WordCloudComponent data={bookKeyword}/>
                </div>
            )}
            {bookData && (
                <>
                    <p className={detalisCss.recommendText}>추천 도서</p>
                    <div className={detalisCss.recommendBox}>
                        <div className={detalisCss.mania}>
                            <p>매니아 도서</p>
                            <div className={detalisCss.maniaBooks}>
                            {mania.map((book, index) => (
                                <img src={book.bookImageURL} alt={''} key={index} />
                            ))}
                            </div>
                        </div>
                        <div>
                            <p>다독자 도서</p>
                            {reader.map((book, index) => (
                                <img src={book.bookImageURL} alt={''} key={index} onClick={() => {moveDetail(book.isbn13)}} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Details;