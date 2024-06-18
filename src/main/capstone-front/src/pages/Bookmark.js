import bookmarkCss from '../styles/Bookmark.module.css';
import Header1 from "../components/Header1";
import {useEffect, useState} from "react";
import BookImg from "../components/BookImg";
import axios from "axios";
import {fetchFavoriteAPI} from "../api/favoriteAPI";
import yesMark from '../images/mainImages/yesMark.png';

function Bookmark() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFavoriteAPI();
                setBooks(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={bookmarkCss.body}>
            <div className={bookmarkCss.header}>
                <Header1/>
            </div>
            <div className={bookmarkCss.content}>
                <p className={bookmarkCss.bookMarkFullName}>즐겨찾기 총 {books.length}개</p>


                        {   books.map((book, index) => (
                            <>
                                <div className={bookmarkCss.bookListBox}>
                                    <div className={bookmarkCss.bookList}>
                                        <div className={bookmarkCss.left}>
                                            <img src={book.book_image_URL}/>
                                        </div>
                                        <div className={bookmarkCss.center}>
                                            <div className={bookmarkCss.bookname}>{book.bookname}</div>
                                            <div className={bookmarkCss.jungang}>
                                                <div className={bookmarkCss.authors}>{book.authors}</div>
                                                <div className={bookmarkCss.publisher}>{book.publisher}</div>
                                                <div className={bookmarkCss.time}>
                                                    <div>{book.favorite_date}</div>
                                                </div>
                                            </div>
                                            <div className={bookmarkCss.juje}>{book.class_no}</div>
                                        </div>

                                        <div className={bookmarkCss.right}>
                                            <div>
                                                <img src={yesMark}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                        }

                            </div>
        </div>
                    )
                }

export default Bookmark;