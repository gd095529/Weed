import viewBookCss from '../styles/component/ViewBook.module.css';
import book from '../images/mainImages/book1.jpg';

function ViewBook() {
    return (
        <div className={viewBookCss.body}>
            <div className={viewBookCss.rank}>
                <p>1위</p>
            </div>
            <div className={viewBookCss.bookBox}>
                <img src={book} alt='책 표지'/>
                <div className={viewBookCss.title}>제목</div>
            </div>
        </div>
    )
}

export default ViewBook;