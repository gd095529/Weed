import detalisCss from '../styles/details.module.css';
import Header1 from "../components/Header1";
import ListView from "../components/ListView";

function details() {
    return (
        <div className={detalisCss.body}>
            <div className={detalisCss.header}>
                <Header1 />
            </div>

            <div className={detalisCss.context}>
                <p>불편한 편의점 :김호연 장편소설</p>
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

export default details;