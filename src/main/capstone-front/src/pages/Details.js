import detalisCss from '../styles/details.module.css';
import Header1 from "../components/Header1";
import ListView from "../components/ListView";
import noMark from '../images/mainImages/noMark.png';
import yesMark from '../images/mainImages/yesMark.png';
import {useEffect, useState} from "react";
import LineChart from "../exportJS/lineChart";
import WordCloudComponent from "../exportJS/WordCloud";
import {useLocation} from "react-router-dom";
import {detailAPI} from "../api/detailAPI";
import {maniaAPI} from "../api/maniaAPI";
import {readerAPI} from "../api/readerAPI";
import axios from "axios";
import {fetchFavoriteAPI} from "../api/favoriteAPI";
import {fetchFavoriteAddAPI} from "../api/favoriteAddAPI";
import {fetchFavoriteDelAPI} from "../api/favoriteDelAPI";

function Details() {
    const location = useLocation();
    const [isMark, setMark] = useState(null);
    const [bookData, setBookData] = useState(null);
    const [bookLoanData, setBookLoanData] = useState([]);
    const [bookKeyword, setBookKeyword] = useState([]);
    const [mania, setMania] = useState([]);
    const [reader, setReader] = useState([]);
    const [favorites_id, setFavorites_id] = useState('');
    const [books_id, setBooks_id] = useState('');

    useEffect(() => {
        const fetchDetail = async () => {
            const isbn = location.state.isbn;
            const config = {
                member_id: 1,
                department_id: 1
            };
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
    }, [location.state.isbn]);

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
            const isbn = location.state.isbn;

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
            const isbn = location.state.isbn;

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
            addFavorite(7);
        } else if (isMark === false) {
            deleteFavorite(favorites_id, books_id);
        }

    }, [isMark]);

    useEffect(() => {
        const favoriteList = async () => {
            try {
                const data = await fetchFavoriteAPI();
                const result = data.filter((item) => item.isbn === bookData.book.isbn13);
                console.log(result);
                setFavorites_id(result.favorite_id);
                setBooks_id(result.book_id);

                console.log(favorites_id + "id");
                console.log(books_id + "bId");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        favoriteList();
    }, []);

    // 동기적으로
    useEffect(() => {
        if (favorites_id !== null && books_id !== null) {
            console.log(favorites_id + " id");
            console.log(books_id + " bId");
        }
    }, [favorites_id, books_id]);

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
                <div className={detalisCss.recommendBox}>
                    <p>추천 도서</p>
                    <div>
                        <p>매니아 도서</p>
                        {mania.map((book, index) => (
                            <img key={index} src={book.bookImageURL} alt={''}/>
                        ))}
                    </div>
                    <div>
                        <p>다독자 도서</p>
                        {reader.map((book, index) => (
                            <img src={book.bookImageURL} alt={''} key={index}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Details;