import mainCss from '../styles/Main.module.css';
import Header1 from "../components/Header1";
import {type} from '../constants/typeConstant';
import ViewBook2 from "../components/ViewBook2";

/**
 * 메인 페이지 구성
 * 위에는 Header 파일이 들어감.
 * mainBookBox - 도서관 이벤트, 연령별 인기 도서, 나이별 인기 도서, 대출 인기 도서, 학과 인기 도서를 보여줌 (완료)
 * mainBookBox 의 왼쪽에는 위의 목록들을 나열. 마우스가 올라가면 해당 페이지가 오른편에 보이게끔 할 것.
 * mainBookBox 의 오른편에는 학교 이벤트 또는 책 3권이 보임. 마우스가 올라오면 오른쪽, 왼쪽으로 이동할 수 있는 이미지가 보이고, 이동이 가능함.
 * mainBookBox 의 오른편의 위쪽에 "[남성 ∨] 인기 도서" 표시. "남성" 표시를 누르면 다른 선택지들이 뜸.
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
    return (
        <div className={mainCss.body}>
            <div>
                <Header1/>
            </div>
            <div className={mainCss.section}>
                <div className={mainCss.mainBookBox}>
                    <div className={mainCss.typeBox}>
                        {
                            type.map((item, index) => (
                                <div key={index}>{item.name}</div>
                            ))
                        }
                    </div>
                    <div className={mainCss.viewBox}>
                        <div className={mainCss.top}>위</div>
                        <div className={mainCss.middle}>가운데</div>
                        <div className={mainCss.bottom}>아래</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;