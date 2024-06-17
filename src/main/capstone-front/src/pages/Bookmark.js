import bookmarkCss from '../styles/Bookmark.module.css';
import Header1 from "../components/Header1";
import {useEffect, useState} from "react";
import BookImg from "../components/BookImg";
import axios from "axios";
import {fetchFavoriteAPI} from "../api/favoriteAPI";

function Bookmark() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFavoriteAPI();
                setBooks(data);
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
            <p>즐겨찾기</p>
            <div className={bookmarkCss.content}>
                {
                    books.map((book, index) => (
                            <div key={index} className={bookmarkCss.bookBox}>
                                <BookImg bookImg={book.book_image_URL} title={book.bookname}/>
                            </div>
                    ))
                }
            </div>
        </div>
                    )
                }

export default Bookmark;