import viewBookCss from '../styles/component/ViewBook.module.css';

function ViewBook(props) {
    return (
        <div className={viewBookCss.body}>
            <div className={viewBookCss.rank}>
                <p>{props.rank + 1}위</p>
            </div>
            <div className={viewBookCss.bookBox}>
                <img src={props.url} alt='책 표지'/>
                <div className={viewBookCss.title}>{props.title}</div>
            </div>
        </div>
    )
}

export default ViewBook;