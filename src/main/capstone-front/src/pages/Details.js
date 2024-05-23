import detalisCss from '../styles/details.module.css';
import Header1 from "../components/Header1";
import ListView from "../components/ListView";
import noMark from '../images/mainImages/noMark.png';
import yesMark from '../images/mainImages/yesMark.png';
import {useState} from "react";
import LineChart from "../exportJS/lineChart";

function Details() {
    const [isMark, setMark] = useState(false);

    const clickMark = () => {
        setMark(!isMark);
        if (isMark) {
            alert('즐겨찾기에 추가하였습니다!');
        } else {
            alert('즐겨찾기에서 제거하였습니다!');
        }
    }

    const data = [12, 5, 6, 8, 0, 15, 7, 10, 23, 10];

    return (
        <div className={detalisCss.body}>
            <div className={detalisCss.header}>
                <Header1 />
            </div>

            <div className={detalisCss.context} >
                <p>불편한 편의점 :김호연 장편소설
                    <img src={isMark ? noMark : yesMark} alt={'1'} onClick={clickMark}/>
                </p>

                <div>
                    <img />
                    <table border={'1px solid black'}>
                        <tr>
                            <td>저자정보</td>
                            <td colSpan={'5'}>지은이: 김호연</td>
                        </tr>
                        <tr>
                            <td>출판사</td>
                            <td colSpan={'5'}>나무옆의자</td>
                        </tr>
                        <tr>
                            <td>책소개</td>
                            <td colSpan={'5'}>소개</td>
                        </tr>
                        <tr>
                            <td>출판연월</td>
                            <td colSpan={'1'}>2022</td>
                            <td>ISBN</td>
                            <td colSpan={'3'}>9719어쩌고</td>
                        </tr>
                        <tr>
                            <td>Vol</td>
                            <td>2</td>
                            <td>주제분야</td>
                            <td>813.7</td>
                            <td>총 대출건수</td>
                            <td>70,743</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div className={detalisCss.loan}>
                <p>대출 추이</p>
                <div>
                    <p>chart</p>
                    <div><LineChart data={data} /></div>
                </div>

                <div>data</div>
            </div>

            <div className={detalisCss.manyLoan}>
                <p>다대출 이용자 그룹</p>
                <p>최근 30일동안 대출을 가장 많이 한 연령 및 성별을 제공합니다()</p>
            </div>

            <div className={detalisCss.keyword}>
                <p>주요 키워드</p>
            </div>
            
            <div>
                <p>추천 도서</p>
                { /**여기에 나중에 ListView를 넣으면 됨!
                 함께 대출된 도서
                 마니아를 위한 추천 도서
                 다독자를 위한 추천 도서
                 api 정상 작동하면 실험 ㄱㄱ*/}
            </div>

        </div>
    )
}

export default Details;