import Header1 from '../components/Header1';
import ListView from "../components/ListView";
import main1Css from '../styles/Main1.module.css';
import {useEffect, useRef, useState} from "react";
import * as popularAPI from "../api/PopularLoanBooks";
import school from '../images/mainImages/school.png';
import fire from '../images/mainImages/fire.png';
import book from '../images/mainImages/book.png';

function Main1() {
    const [isMore, setMore] = useState(false);
    const [endNum, setEndNum] = useState(5);
    const [books, setBooks] = useState([]);
    const [index, setIndex] = useState(1);
    const contentRef = useRef(null);

    const clickMore = () => {
        setMore(!isMore);
        setIndex(index + 1);
    }

    const clickRight = () => {
        setIndex(index + 1);
        if (index === 6) {
            setIndex(1);
        }
    }

    const clickLeft = () => {
        setIndex(index - 1);
        if (index === 0) {
            setIndex(5);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await popularAPI.fetchBooks(25 , index);
                setBooks([...books]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={main1Css.body}>
            <div className={main1Css.header}>
                <Header1 />
            </div>
            <div className={main1Css.listBox}>
                <div className={main1Css.list} ref={contentRef}>
                    {
                        books.length === 25 &&
                        <ListView theme={'학과별 인기 도서'} endNum = {endNum} isMore = {isMore}
                                  books = {books} clickMore = {clickMore} icon = {school}
                                  clickLeft = {clickLeft} clickRight = {clickRight}
                        />
                    }
                </div>
                <div className={main1Css.list}>
                    {
                        books.length === 25 &&
                        <ListView theme={'이번주 인기 도서'} endNum = {endNum} isMore = {isMore} books = {books} icon = {fire} func={clickMore}/>
                    }
                </div>
                <div className={main1Css.list}>
                    {
                        books.length === 25 &&
                        <ListView theme={'이번달 인기 도서'} endNum = {endNum} isMore = {isMore} books = {books} func={clickMore} icon = {fire}/>
                    }
                </div>
                <div className={main1Css.list}>
                    {
                        books.length === 25 &&
                        <ListView theme={'인기 대출 도서'} endNum = {endNum} isMore = {isMore} books = {books} func={clickMore} icon = {book}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Main1;