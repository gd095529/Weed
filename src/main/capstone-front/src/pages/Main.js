import mainCss from '../styles/Main.module.css';
import Header1 from "../components/Header1";
import {types} from '../constants/typeConstant';
import ViewBook2 from "../components/ViewBook2";
import {useState, useEffect} from "react";
import MainBook from "../components/MainBook";
import left from "../images/mainImages/left.png";
import right from "../images/mainImages/right.png";
import {todayBooksAPI} from '../api/bookImgURLConstant';
import {descriptionAPI} from "../api/descriptionAPI";
import {useNavigate} from "react-router-dom";

/**
 * 메인 페이지 구성
 * 위에는 Header 파일이 들어감. (완료)
 * mainBookBox - 도서관 이벤트, 연령별 인기 도서, 성별 인기 도서 대출 인기 도서, 학과 인기 도서를 보여줌 (완료)
 * mainBookBox 의 오른편에는 MainBook 이라는 컴포넌트를 이용. (type, index, InitIndex, clickMainInddex()를 props로 넘겨줌!) (완료)
 * mainBookBox 의 왼쪽에는 위의 목록들을 나열. 마우스가 올라가면 해당 페이지가 오른편에 보이게끔 할 것. (완료)
 * mainBookBox 의 오른편에는 학교 이벤트 또는 책 3권이 보임. 마우스가 올라오면 오른쪽, 왼쪽으로 이동할 수 있는 이미지가 보이고, 이동이 가능함. (책 3권 아직 X)
 * mainBookBox 의 오른편의 위쪽에 "[남성 ∨] 인기 도서" 표시. "남성" 표시를 누르면 다른 선택지들이 뜸. (학과 아직 X)
 * 단, 성별의 경우 [남] [여]를 한 번에 보여주면서 등수 비교. (완료)
 * mainBookBox 의 오른편의 아래쪽에 현재 어떤 페이지를 보여주는지 index를 표시할 것. 표시는 그 기다란 타원형 사진 사용. 해당 페이지에는 짙은 색의 기다란 타원 사진 사용. 인덱스 사진을 누르면 이동. (완료)
 * mainBookBox 에 ViewBook 이라는 컴포넌트를 이용함. (완료)
 * ViewBook 컴포넌트에 넘길 매개변수 - books 객체 배열
 * books 객체 배열에는 bookname, authors, bookImageURL이 들어감.
 * todayBookBox에는 하루 치 인기 도서를 뽑아옴.
 * todayBookBox에 description, bookname, bookImageURL, authors, publisher api가 필요함.
 * todayBookBox의 왼편에는 그냥 큰 책 이미지를 띄어 둘 예정. (완료)
 * todayBookBox의 오른편에는 책 소개, 책 이름, 저자명, 출판사를 적음 (완료)
 * todayBookBox의 오른편 아래는 오늘의 책 5권 이미지를 작게 띄어둠. (todayBook - 각각의 책) (완료 - 수정 5개 -> 4개)
 * 아래의 작은 이미지(todayBook)를 누르면 해당 소개로 넘어가짐. (완료)
 * 해당 todayBook에는 border를 굵게 줌 (완료)
 */
function Main() {
    const [getType, setType] = useState(types[0].type); // 마우스가 올라간 list의 타입 설정
    const [isViewBoxEnter, setIsViewBoxEnter] = useState(false);
    const [getIndex, setIndex] = useState(1); // (MainBook으로 넘겨줄 값).bottom부분의 Bar 부분 변경을 위함. 기본값은 인덱스 1일 때
    const [getInitIndex, setInitIndex] = useState(5); // type들의 기본 Index 지정. (getType의 초기 Index 값을 가져옴)
    const [getTodayIndex, setTodayIndex] = useState(0); // todayBook의 Index
    const [books, setBooks] = useState([]); // 오늘의 책
    const [booksDes, setBooksDes] = useState([]); // 오늘의 책 설명 가져오기
    const navigate = useNavigate();

    // InitIndex를 넘어가 있는 상태에서 더 적은 InitIndex를 가진 List로 넘어가면 에러 발생하니 방지
    if (getIndex > getInitIndex) {
        setIndex(1);
    }

    // mainBookBox의 왼쪽 리스트에 마우스가 올라가면
    const typeMouseEnter = (type, index) => {
        setType(type);
        setInitIndex(index);
    }

    // viewBox에 마우스가 올라갔는가
    const viewBoxEnter = () => {
        setIsViewBoxEnter(true);
    }

    // viwBox에 마우스가 내려갔는가
    const viewBoxLeave = () => {
        setIsViewBoxEnter(false);
    }

    // index 왼쪽으로 이동
    const moveLeft = () => {
        if (getIndex - 1 <= 0) {
            setIndex(getInitIndex);
        } else {
            setIndex(getIndex - 1);
        }
    }

    // index 오른쪽으로 이동
    const moveRight = () => {
        if (getIndex + 1 > getInitIndex) {
            setIndex(1);
        } else {
            setIndex(getIndex + 1);
        }
    }

    // MainBookIndex를 클릭하면 해당 Index로 이동
    const clickMainIndex = (index) => {
        setIndex(index);
    }

    // todayIndex를 클릭하면 해당 Index의 내용을 보여줌
    const clickTodayIndex = (index) => {
        setTodayIndex(index);
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await todayBooksAPI();
                const books = [];

                for (let i = 0; i < Math.min(4, fetchedBooks.length); i++) {
                    books.push(fetchedBooks[i]);
                    const config = {
                        member_id: 1,
                        department_id: 1
                    }
                    fetchDescription(fetchedBooks[i].isbn, config, i);
                }

                setBooks(books);
            } catch (error) {
                console.error("Error fetching books: ", error);
            }
        };

        const fetchDescription = async (isbn, config, index) => {
            try {
                const fetchedDescription = await descriptionAPI(isbn, config);
                setBooksDes(prevState => {
                    const newDes = [...prevState];
                    newDes[index] = fetchedDescription;
                    return newDes;
                });
            } catch (error) {
                console.error(`Error fetching description for ISBN ${isbn}: `, error);
            }
        };

        fetchBooks();
    }, []);


    useEffect(() => {
        //console.log(booksDes);
    }, [booksDes])

    const moveDetail = () => {
        navigate("/detail", { state: {
            isbn: books[getTodayIndex].isbn
            }});
    }

    return (
        <div className={mainCss.body}>
            <div>
                <Header1/>
            </div>
            <div className={mainCss.section}>

                <div className={mainCss.mainBookBox}>
                    <div className={mainCss.typeBox}>
                        {
                            types.map((item, index) => (
                                <div key={index}
                                     style={{padding: `calc(100% / ${types.length}) 1rem`}}
                                     onMouseEnter={() => typeMouseEnter(item.type, item.index)}
                                >
                                    {item.name}
                                </div>
                            ))
                        }
                    </div>
                    <div className={mainCss.viewBox}
                         onMouseEnter={viewBoxEnter} onMouseLeave={viewBoxLeave}>
                        <MainBook type={getType} index={getIndex} initIndex={getInitIndex}
                                  funtion={clickMainIndex}/>
                        {isViewBoxEnter &&
                            <>
                                <img src={left} alt={'left'} className={mainCss.leftImg} onClick={moveLeft}/>
                                <img src={right} alt={'right'} className={mainCss.rightImg} onClick={moveRight}/>
                            </>
                        }
                    </div>
                </div>

                <div className={mainCss.todayBookBox}>
                    {books.length !== 0 &&
                    <img className={mainCss.todayLeft} src={books[getTodayIndex].book_image_URL} alt={'커다란 책 이미지 1'}
                        onClick={moveDetail}
                    />}
                    <div className={mainCss.todayRight}>
                        <p>오늘의 책</p>
                        {books.length !== 0 &&
                        <div className={mainCss.todayTitle}>{books[getTodayIndex].bookname}</div>
                        }
                        {booksDes.length !== 0 &&
                        <div className={mainCss.todayDescription}>{booksDes[getTodayIndex]}</div>
                        }
                        {books.length !== 0 &&
                        <div className={mainCss.tie}>
                            <div className={mainCss.todayAuthor}>{books[getTodayIndex].authors}</div>
                            <div className={mainCss.todayPublisher}>{books[getTodayIndex].publisher}</div>
                        </div>
                        }
                        <div className={mainCss.bookTie}>
                            {
                                books.map((book, index) => (
                                    <img key={index} className={mainCss.todayIndex}
                                         src={books[index].book_image_URL} alt={'커다란 책 이미지 1'}
                                         style={{border: getTodayIndex === index ? '5px solid #a4c1fc' : '1px solid black'}}
                                         onClick={() => clickTodayIndex(index)}
                                    />
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Main;