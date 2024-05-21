import mainCss from '../styles/Main.module.css';
import Header from '../components/Header';
import Nav from '../components/Nav';
import ViewBook from '../components/ViewBook';
import {useEffect, useLayoutEffect, useState, useRef} from "react";
import * as popularAPI from '../api/PopularLoanBooks';
import * as scrollBottom from '../exportJS/scrollBottom';
import loading from '../images/mainImages/loading.gif';

function Main() {
    const [bests, setBests] = useState([]);
    const [index, setIndex] = useState(1);
    const contentRef = useRef(null);
    const maxPage = 5000;
    const once = 20;
    const [endNum, setEndNum] = useState(20);

    useEffect(() => {
        // PopularLoanBooks.js의 api를 이용 (3번 api)
        // async 없으면 제대로 작동 안함.
        const fetchData = async () => {
            try {
                const books = await popularAPI.loanBooks(once , index);
                setIndex(index + 1);
                setBests(prevBests => [...prevBests, ...books]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();

    }, [endNum]);

    useEffect(() => {
        // 스크롤에 관한 이벤트 함수
        function scrollHandle() {
            if (scrollBottom.isBottom(contentRef) && endNum < maxPage) {
                setEndNum(endNum + once);
            }
        }
        // 스크롤에 이벤트 담기
        contentRef.current.addEventListener('scroll', scrollHandle);

        return () => {
            // 스크롤 이벤트 빼기
            if (contentRef.current) {
                contentRef.current.removeEventListener('scroll', scrollHandle);
            }
        }
    }, [endNum]);

    return (
        <div className={mainCss.body}>
            <div className={mainCss.header}>
                <Header/>
            </div>
            <div className={mainCss.nav}>
                <Nav />
            </div>
            <div className={mainCss.content} ref={contentRef}>

                {bests.map((book, index) => (
                    <ViewBook key={index} rank={index} url={book.url} title={book.title}/>
                ))}
                {bests.length !== endNum && <img src={loading} alt='로딩'/>}
            </div>
        </div>
    )
}

export default Main;