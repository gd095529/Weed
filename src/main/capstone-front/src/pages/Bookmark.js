import bookmarkCss from '../styles/Bookmark.module.css';
import Header1 from "../components/Header1";

function Bookmark() {
    return (
        <div className={bookmarkCss.body}>
            <div className={bookmarkCss.header}>
                <Header1 />
            </div>
            <div>
                <p>즐겨찾기</p>
            </div>
        </div>
    )
}

export default Bookmark;