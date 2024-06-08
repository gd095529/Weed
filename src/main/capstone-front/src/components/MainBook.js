import mainCss from "../styles/Main.module.css";
import hereBar from '../images/hereBar.png';
import noBar from '../images/noBar.png';
import {useEffect, useState} from "react";
import {popularLoanBooks} from "../api/PopularLoanBooks";
import {departmentAPI} from "../api/department";
import ViewBook2 from "./ViewBook2";

function MainBook(props) {
    const [selectAge, setSelectAge] = useState(0);
    const [selectDept, setSelectDept] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [popularBooks, setPopularBooks] = useState(null);
    const [viewBooks, setViewBooks] = useState(null);
    const [manBooks, setManBooks] = useState(null);
    const [womanBooks, setWomanBooks] = useState(null);
    const [department, setDepartment] = useState(null);

    let top, middle;
    const eventImg = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUAIyndA7gYDd9HiAzAg3VR73AAUs9E8y4Dg&s',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/%EC%98%A8%EB%9D%BC%EC%9D%B8%20%EC%9D%B4%EC%9A%A9%EA%B5%90%EC%9C%A1%20%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/%EC%9D%B4%EB%8B%AC%EC%9D%98-%ED%95%99%EA%B3%BC%EB%B3%84-%EC%B6%94%EC%B2%9C%EC%9E%A1%EC%A7%80202405.jpg',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/darakwon.jpg',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/c93a5135c40f48a8bd90c41c4cbecd2a.png',
    ]

    // 인기 도서 불러옴
    useEffect(() => {
        const fetchBooks = async () => {
            const books = [];
            const manBook = [];
            const womanBook = [];
            if (props.type === 'department') {
                // Department books fetching logic here
            } else if (props.type === 'event') {
                // Event books fetching logic here
            } else if (props.type === 'age') {
                const config = {
                    age: selectAge === 0 ? '20' : '30'
                };

                try {
                    const bookList = await popularLoanBooks(config);
                    for (let i = 0; i < props.initIndex * 3; i++) {
                        if (bookList[i]) {
                            books.push(bookList[i]);
                        }
                    }
                } catch (error) {
                    console.log(error.message);
                }
                // 성별 시작
            } else if (props.type === 'gender') {
                const config1 = {
                    gender: '0'
                };

                try {
                    const bookList = await popularLoanBooks(config1);
                    for (let i = 0; i < props.initIndex; i++) {
                        if (bookList[i]) {
                            manBook.push(bookList[i]);
                        }
                    }
                } catch (error) {
                    console.log(error.message);
                }

                const config2 = {
                    gender: '1'
                };

                try {
                    const bookList = await popularLoanBooks(config2);
                    for (let i = 0; i < props.initIndex; i++) {
                        if (bookList[i]) {
                            womanBook.push(bookList[i]);
                        }
                    }
                } catch (error) {
                    console.log(error.message);
                }
            } else if (props.type === 'department') {

            }
            setPopularBooks(books);
            setManBooks(manBook);
            setWomanBooks(womanBook);
        };

        fetchBooks();
        console.log(popularBooks);
    }, [props.type, selectAge])

    // Index가 변경될 때 마다 보여주는 책 변경하기.
    useEffect(() => {
        const updateViewBooks = () => {
            const books = [];
            for (let i = (props.index - 1) * 3; i < props.index * 3; i++) {
                if (popularBooks && popularBooks[i]) {
                    books.push(popularBooks[i]);
                }
            }
            setViewBooks(books);
        };

        updateViewBooks();
    }, [props.index, popularBooks]);

    useEffect(() => {
        const updateDept = async() => {
            const depts = [];
            try {
                const dept = await departmentAPI();
                for (let i = 0; i < dept.length; i++) {
                    depts.push(dept[i].department);
                }

            } catch (e) {
                console.log(e.message);
            }

            setDepartment(depts);
        }
        updateDept();


    }, []);

    // type의 경우, Age인지 Dept인지 확인하는 용도. 코드를 이상하게 짜버려서 이게 필요해짐.
    // type이 true면
    // options는 말 그대로 드롭다운에 들어갈 것들 적으면 됨. 배열 형태로 넣기 필수
    const customSelect = (type, options) => {
        const defaultSelectStyle = {
            lineHeight: '1rem',
            height: '1rem',
            display: 'inline-block',
            fontSize: '1rem',
            cursor: 'pointer',
            position: 'relative'
        }
        const optionsStyles = {
            display: isOpen ? 'flex' : 'none',
            position: 'absolute',
            backgroundColor: 'white',
            border: '1px solid gray',
            zIndex: '1',
            flexDirection: 'column',
            borderBottom: 'none',
            width: '8rem'
        }

        const optionStyle = {
            padding: '0.2rem',
            borderBottom: '1px solid gray',

        }

        const openOption = () => {
            setIsOpen(!isOpen);
        }

        const closeOption = () => {
            setIsOpen(false);
        }

        const selectOpt = (name) => {
            if (type === 'age') {
                setSelectAge(options.indexOf(name));
            } else {
                setSelectDept(options.indexOf(name));
            }
            closeOption();
        }

        const unselectOpt = [];

        for (let i = 0; i < options.length; i++) {
            if (type === 'age' && i !== selectAge) {
                unselectOpt.push(options[i]);
            } else if (type === 'dept' && i !== selectDept) {
                unselectOpt.push(options[i]);
            }
        }

        return (
            <div style={defaultSelectStyle}>
                <div onClick={openOption}>{options[type === "age" ? selectAge : selectDept]}<span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>∨</span></div>
                <div style={optionsStyles}>
                    {unselectOpt.map((option, index) => (
                        <div key={index} onClick={() => selectOpt(option)} style={optionStyle}>{option}</div>
                    ))}
                </div>
            </div>
        )
    }

    // IndexBar를 통해 어떤 Index가 활성화 된 지 알려주는 함수
    // 근데 barCount에 숫자 넣는게 아니라 배열 넣어야 함.
    const setIndexBar = (barCount) => {
        return (
            <>
                {
                    barCount.map((count, index) => (
                        <img key={index} src={props.index === count ? hereBar : noBar} alt={'bar'}
                             onClick={() => props.funtion(index + 1)}
                        />
                    ))
                }
            </>
        )
    }

    // barCount 배열로 넣을 것
    let barCount = [];

    // type에 맞게 각각 정의.
    if (props.type === 'event') {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/2558/2558944.png'} alt={'event'}/>
                <p>영진전문대 도서관 이벤트</p>
            </div>;
        middle =
            <img className={mainCss.middle}
                 src={eventImg[props.index - 1]}
                 alt={''} style={{margin: '0 auto'}}
            />;
    } else if (props.type === "age") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        const age = ["20대", "30대"];
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/4994/4994683.png'} alt={'event'}/>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>{customSelect("age", age)} 인기 도서</div>
            </div>
        middle =
            <div className={mainCss.middle}>
                {
                    popularBooks.length === props.initIndex * 3 &&
                    viewBooks.length === 3 &&
                    viewBooks.map((book, index) => (
                        <div key={index}>
                            <ViewBook2 bookname={book.bookname} authors={book.authors}
                                       bookImgURL={book.book_image_URL}/>
                        </div>
                    ))
                }
            </div>
    } else if (props.type === "gender") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/3939/3939785.png'} alt={'event'}/>
                <p>성별 인기 도서</p>
            </div>
        middle =
            <div className={mainCss.middle} style={{display: 'flex', alignItems: 'flex-start'}}>
                <div style={{
                    width: '50%',
                    borderRight: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                }}>
                    <img src={'https://cdn.icon-icons.com/icons2/2248/PNG/512/gender_male_icon_137554.png'} alt={''}
                         style={{width: '1.5rem', height: '1.5rem'}}
                    />
                    <div>남성</div>
                    <div style={{position: 'absolute', width: '10rem', top: '20%'}}>
                        {
                            manBooks.length === props.initIndex &&
                            <ViewBook2 bookname={manBooks[props.index - 1].bookname} authors={manBooks[props.index - 1].authors}
                                   bookImgURL={manBooks[props.index - 1].book_image_URL}/>
                        }
                    </div>
                </div>
                <div style={{width: '50%', display: 'flex', justifyContent: 'center', gap: '0.5rem'}}>
                    <img src={'https://cdn.icon-icons.com/icons2/1914/PNG/512/femalesymbol_121533.png'} alt={''}
                         style={{width: '1.3rem', height: '1.3rem', marginLeft: '1rem'}}
                    />
                    <div>여성</div>
                    <div style={{position: 'absolute', width: '10rem', top: '20%'}}>
                        {
                            womanBooks.length === props.initIndex &&
                            <ViewBook2 bookname={womanBooks[props.index - 1].bookname}
                                       authors={womanBooks[props.index - 1].authors}
                                       bookImgURL={womanBooks[props.index - 1].book_image_URL}/>
                        }
                    </div>
                </div>
            </div>
    } else if (props.type === "loan") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/5956/5956911.png'} alt={'event'}/>
                <p>대출 인기 도서</p>
            </div>
        middle =
            <div className={mainCss.middle}>

            </div>
    } else if (props.type === "department") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }

        top =
            department !== null &&
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/5027/5027398.png'} alt={'event'}/>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>{customSelect("dept", department)}인기
                    도서
                </div>
            </div>

        middle =
            <div className={mainCss.middle}>

            </div>
    } else {
        top = "error!";
    }

    return (
        <>
            {top}
            {middle}
            <div className={mainCss.bottom}>
                {setIndexBar(barCount)}
            </div>
        </>
    )
}

export default MainBook;