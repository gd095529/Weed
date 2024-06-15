import detalisCss from '../styles/details.module.css';
import Header1 from "../components/Header1";
import ListView from "../components/ListView";
import noMark from '../images/mainImages/noMark.png';
import yesMark from '../images/mainImages/yesMark.png';
import {useEffect, useState} from "react";
import LineChart from "../exportJS/lineChart";
import WordCloudComponent from "../exportJS/WordCloud";
import {useLocation} from "react-router-dom";
import {detailAPI} from "../api/detailAPI";

function Details() {
    const location = useLocation();
    const [isMark, setMark] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            const isbn = location.state.isbn;
            const config = {
                member_id: 1,
                department_id: 1
            }
            try {
                const data= await detailAPI(isbn, config);

            } catch (error) {

            }
        };

        fetchDetail();
    }, []);

    const clickMark = () => {
        setMark(!isMark);
        if (isMark) {
            alert('즐겨찾기에 추가하였습니다!');
        } else {
            alert('즐겨찾기에서 제거하였습니다!');
        }
    }

    const data = [12, 5, 6, 8, 0, 15, 7, 10, 23, 10];
    const data1 = [
        { text: 'React', value: 50 },
        { text: 'D3', value: 49 },
        { text: 'JavaScript', value: 48 },
        { text: 'HTML', value: 47 },
        { text: 'CSS', value: 46 },
        { text: 'Web Development', value: 45 },
        { text: 'Frontend', value: 44 },
        { text: 'Backend', value: 43 },
        { text: 'Fullstack', value: 42 },
        { text: 'Programming', value: 41 },
        { text: 'React', value: 40 },
        { text: 'D3', value: 39 },
        { text: 'JavaScript', value: 38 },
        { text: 'HTML', value: 37 },
        { text: 'CSS', value: 36 },
        { text: 'Web Development', value: 35 },
        { text: 'Frontend', value: 34 },
        { text: 'Backend', value: 33 },
        { text: 'Fullstack', value: 32 },
        { text: 'Programming', value: 31 },
        { text: 'React', value: 30 },
        { text: 'D3', value: 29 },
        { text: 'JavaScript', value: 28 },
        { text: 'HTML', value: 27 },
        { text: 'CSS', value: 26 },
        { text: 'Web Development', value: 25 },
        { text: 'Frontend', value: 24 },
        { text: 'Backend', value: 23 },
        { text: 'Fullstack', value: 22 },
        { text: 'Programming', value: 21 },
    ];

    useEffect(() => {

    }, []);


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
                <WordCloudComponent data={data1} />
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