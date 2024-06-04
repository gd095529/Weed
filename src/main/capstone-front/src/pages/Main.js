import mainCss from '../styles/Main.module.css';
import Header1 from "../components/Header1";
import {types} from '../constants/typeConstant';
import ViewBook2 from "../components/ViewBook2";
import {useState, useEffect} from "react";
import MainBook from "../components/MainBook";
import left from "../images/mainImages/left.png";
import right from "../images/mainImages/right.png";

/**
 * 메인 페이지 구성
 * 위에는 Header 파일이 들어감.
 * mainBookBox - 도서관 이벤트, 연령별 인기 도서, 성별 인기 도서 대출 인기 도서, 학과 인기 도서를 보여줌 (완료)
 * mainBookBox 의 오른편에는 MainBook 이라는 컴포넌트를 이용. (type을 props로 넘겨줌!) (완료)
 * mainBookBox 의 왼쪽에는 위의 목록들을 나열. 마우스가 올라가면 해당 페이지가 오른편에 보이게끔 할 것. (완료)
 * mainBookBox 의 오른편에는 학교 이벤트 또는 책 3권이 보임. 마우스가 올라오면 오른쪽, 왼쪽으로 이동할 수 있는 이미지가 보이고, 이동이 가능함.
 * mainBookBox 의 오른편의 위쪽에 "[남성 ∨] 인기 도서" 표시. "남성" 표시를 누르면 다른 선택지들이 뜸. (완료)
 * mainBookBox 의 오른편의 아래쪽에 현재 어떤 페이지를 보여주는지 index를 표시할 것. 표시는 그 기다란 타원형 사진 사용. 해당 페이지에는 짙은 색의 기다란 타원 사진 사용. 최대 5개로 작업. 인덱스 사진을 누르면 이동.
 * mainBookBox 에 ViewBook 이라는 컴포넌트를 이용함.
 * ViewBook 컴포넌트에 넘길 매개변수 - books 객체 배열
 * books 객체 배열에는 bookname, authors, bookImageURL이 들어감.
 * today book에는 하루 치 인기 도서를 뽑아옴.
 * today book에 description, bookname, bookImageURL, authors, publisher api가 필요함.
 * today book의 왼편에는 그냥 큰 책 이미지를 띄어 둘 예정.
 * today book의 오른편에는 책 소개, 책 이름, 저자명, 출판사를 적음
 * today book의 오른편 아래는 오늘의 책 5권 이미지를 작게 띄어둠.
 * 아래의 작은 이미지를 누르면 해당 소개로 넘어가짐.
 * 해당 todayIndex에는 border를 굵게 줌
 */
function Main() {
    const [getType, setType] = useState(types[0].type); // 마우스가 올라간 list의 타입 설정
    const [isViewBoxEnter, setIsViewBoxEnter] = useState(false);
    const [getIndex, setIndex] = useState(1); // (MainBook으로 넘겨줄 값).bottom부분의 Bar 부분 변경을 위함. 기본값은 인덱스 1일 때
    const [getInitIndex, setInitIndex] = useState(5); // type들의 기본 Index 지정. (getType의 초기 Index 값을 가져옴)

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
                        <MainBook type={getType} index={getIndex} initIndex={getInitIndex}/>
                        {isViewBoxEnter &&
                            <>
                                <img src={left} alt={'left'} className={mainCss.leftImg} onClick={moveLeft}/>
                                <img src={right} alt={'right'} className={mainCss.rightImg} onClick={moveRight}/>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;