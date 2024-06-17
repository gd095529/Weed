import bookImgCss from '../styles/component/BookImg.moudle.css';

function BookImg(props) {
    return (
        <div className={bookImgCss.body}>
            <img src={props.bookImg} className={bookImgCss.img} alt={''}/>
            <img src={'https://cdn-icons-png.flaticon.com/512/7855/7855869.png'} className={bookImgCss.trash} alt={''}/>
            <div className={bookImgCss.title}>{props.title}</div>
        </div>
    )
}

export default BookImg;