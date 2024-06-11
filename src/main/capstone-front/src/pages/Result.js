import resultCss from '../styles/Result.module.css';
import Header1 from "../components/Header1";
import ListView1 from "../components/ListView1";

function Result() {
    return (
        <div className={resultCss.body}>
            <div>
                <Header1 />
            </div>
            <div className={resultCss.resultBox}>
                <div className={resultCss.resultName}>제목 & 저자 & 키워드 결과</div>
                <ListView1 />
                <ListView1 />
                <ListView1 />
                <ListView1 />
                <ListView1 />
                <ListView1 />
                <ListView1 />
                <ListView1 />
                <ListView1 />
                <ListView1 />
            </div>
        </div>
    )
}

export default Result;