import viewBook2Css from '../styles/component/ViewBook2.module.css';

function ViewBook2(props) {
    return(
        <div className={viewBook2Css.body}>
            <div className={viewBook2Css.title}>{props.bookname}</div>
            <div className={viewBook2Css.authors}>{props.authors}</div>
            <img className={viewBook2Css.img} src={props.bookImgURL} alt={'imgURL'} />
        </div>
    )
}

export default ViewBook2