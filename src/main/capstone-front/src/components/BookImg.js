import bookImgCss from '../styles/component/BookImg.moudle.css';

function BookImg(props) {
    return (
        <div className={bookImgCss.body}>
            <img src={props.bookImg}/>
        </div>
    )
}

export default BookImg;