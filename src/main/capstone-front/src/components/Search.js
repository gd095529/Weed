import searchCss from '../styles/component/Search.module.css';

function Search() {
    return (
        <div className={searchCss.body}>
            <div className={searchCss.searchBox}>
                <input type={'text'} placeholder={'제목'}/>
                <input type={'text'} placeholder={'저자'}/>
                <input type={'text'} placeholder={'키워드'}/>
                <div>검색하기</div>
            </div>
        </div>
    )

}

export default Search;