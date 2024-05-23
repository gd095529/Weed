import searchCss from '../styles/Search.module.css';
import Header1 from "../components/Header1";

function Search() {
    return (
        <div className={searchCss.body}>
            <div className={searchCss.header}>
                <Header1 />
            </div>

            <div className={searchCss.search}>
                <div>
                    <p>도서명</p>
                    <input type={'text'} />
                </div>
                <div>
                    <p>저자명</p>
                    <input type={'text'} />
                </div>
                <div>
                    <p>키워드</p>
                    <input type={'text'} />
                    { /**키워드 누르면 키워드들이 밑에서 나오도록 할 예정*/}
                </div>
                <div className={searchCss.btnBox}>
                    <div>검색</div>
                    <div>초기화</div>
                </div>
            </div>
            
            <div>
                {
                    true &&
                    <>
                        <p>이전 검색</p>
                    </>
                    /**여기도 ListView 써서 검색 결과들 나오게 하기*/
                }
                {
                    true &&
                    <>
                        <p>검색 결과</p>
                    </>
                    /**여기도 ListView 써서 검색 결과들 나오게 하기*/
                }
            </div>
        </div>
    )
}

export default Search;