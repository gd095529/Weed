// import Header1 from '../components/Header1';
// import ListView from "../components/ListView";
// import main1Css from '../styles/Main1.module.css';
// import {useEffect, useRef, useState} from "react";
// import {detailBooks, loanBooks, trendBooks} from "../api/PopularLoanBooks";
// import school from '../images/mainImages/school.png';
// import fire from '../images/mainImages/fire.png';
// import book from '../images/mainImages/book.png';
//
// const lastMonth = getLastMonth(); // 한달 전 날짜
// const lastWeek = getLastWeek(); // 일주일 전 날짜
// const today = getToday(); // 현재 날짜
//
// // 한달 전 날짜 구하는 함수
// function getLastMonth() {
//     const today = new Date();Date
//     const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
//
//     const year = lastMonth.getFullYear();
//     let month = lastMonth.getMonth() + 1;
//     let day = lastMonth.getDate();
//
//     month = month < 10 ? '0' + month : month;
//     day = day < 10 ? '0' + day : day;
//
//     return `${year}-${month}-${day}`
// }
//
// // 일주일 전 날짜 구하기 함수
// function getLastWeek()  {
//     const today = new Date();
//     const lastWeek = new Date(today.setDate(today.getDate() - 7));
//
//     const year = lastWeek.getFullYear();
//     let month = lastWeek.getMonth() + 1;
//     let day = lastWeek.getDate();
//
//     month = month < 10 ? '0' + month : month;
//     day = day < 10 ? '0' + day : day;
//
//     return `${year}-${month}-${day}`
// }
//
// // 어제 날짜 구하기 함수
// function getToday() {
//     const today = new Date();
//     const yesterday = new Date(today.setDate(today.getDate() - 1));
//
//     const year = yesterday.getFullYear();
//     let month = yesterday.getMonth() + 1;
//     let day = yesterday.getDate();
//
//     month = month < 10 ? '0' + month : month;
//     day = day < 10 ? '0' + day : day;
//
//     return `${year}-${month}-${day}`
// }
//
// function Main1() {
//     const [isMore, setMore] = useState(false); // ListView에서 v << 이거 누른지 안누른지 체크용
//     const [weeklyBooks, setWeeklyBooks] = useState([]); // 이번 주 인기도서 뽑아옴
//     const [monthlyBooks, setMonthlyBooks] = useState([]); // 이번 달 인기도서 뽑아옴
//     const [risingBooks, setRisingBooks] = useState([]); // 인기대출 뽑아옴
//
//     const clickMore = () => {
//         // 클릭하면 유지되도록.
//         setMore(!isMore);
//     }
//
//     // weeklyBooks를 api에서 가져오기 위한 코드. 딱 한 번만 실행.
//     useEffect(() => {
//         const config = {
//             params: {
//                 authKey: '6bc1f702d629a833008a2b52204865ff779c763cf3daca4790b8ffe3e043c0eb',
//                 format: 'json',
//                 from_age: '20',
//                 to_age: '30',
//                 gender: '1'
//             }
//         }
//
//         const fetchData = async () => {
//             try {
//                 const books = await loanBooks(config);
//                 setWeeklyBooks(books);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     }, []);
//
//     // monthlyBooks를 api에서 가져오기 위한 코드. 딱 한 번만 실행.
//     useEffect(() => {
//         const config = {
//             params: {
//                 authKey: '6bc1f702d629a833008a2b52204865ff779c763cf3daca4790b8ffe3e043c0eb',
//                 format: 'json',
//                 startDt: lastMonth,
//                 endDt: today,
//                 from_age: '20',
//                 to_age: '30',
//             }
//         }
//
//         const fetchData = async () => {
//             try {
//                 const books = await loanBooks(config);
//                 setMonthlyBooks(books);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     }, []);
//
//     // 대출인기도서를 api에서 가져오기 위한 코드. 딱 한 번만 실행.
//     useEffect(() => {
//         const config = {
//             params: {
//                 authKey: '6bc1f702d629a833008a2b52204865ff779c763cf3daca4790b8ffe3e043c0eb',
//                 format: 'json',
//                 searchDt: today
//             }
//         }
//
//         const fetchData = async () => {
//             try {
//                 const books = await trendBooks(config);
//                 setRisingBooks(books);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     }, []);
//
//     // ListView 태그를 한 번에 쓰기 위해서 사용
//     // theme는 제목, books는 api나 DB에서 가져온 목록, icon은 아이콘, clickMore은 더보기 눌렀을 때 상태 변화, size는 책을 총 몇개 넣을 건지
//     const getListView = (theme, books, icon, clickMore, size) => {
//         return (
//             books.length === size &&
//             <ListView theme={theme} books={books} icon={icon} clickMore={clickMore} size={size} />
//         )
//     }
//
//     return (
//         <div className={main1Css.body}>
//             <div className={main1Css.header}>
//                 <Header1 />
//             </div>
//             <div className={main1Css.listBox}>
//                 <div className={main1Css.list}>
//                     {
//                         // api에서 25개를 다 뽑아온 뒤 넘기는 코드.
//                         // 렌더링 후 useEffect가 수행되기 때문에 이 조건을 걸지 않으면 weeklyBooks에 값이 없는 채로 넘어가지는 문제 발생.
//                         weeklyBooks.length === 25 &&
//                         getListView('학과별 인기 도서', weeklyBooks, school, clickMore, 25)
//                     }
//                 </div>
//                 <div className={main1Css.list}>
//                     {
//                         weeklyBooks.length === 25 &&
//                         getListView('연령별 인기 도서', weeklyBooks, fire, clickMore, 25)
//                     }
//                 </div>
//                 <div className={main1Css.list}>
//                     {
//                         weeklyBooks.length === 25 &&
//                         getListView('연령별 인기 도서', weeklyBooks, fire, clickMore, 25)
//                     }
//                 </div>
//                 <div className={main1Css.list}>
//                     {
//                         monthlyBooks.length === 25 &&
//                         getListView('이번달 인기 도서', monthlyBooks, fire, clickMore, 25)
//                     }
//                 </div>
//                 <div className={main1Css.list}>
//                     {
//                         risingBooks.length === 15 &&
//                         getListView('대출 인기 도서', risingBooks, book, clickMore, 15)
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Main1;