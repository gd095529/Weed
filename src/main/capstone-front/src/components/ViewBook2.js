import viewBook2Css from '../styles/component/ViewBook2.module.css';
import {useNavigate} from "react-router-dom";

function ViewBook2(props) {
    const navigate = useNavigate();

    const moveDetail = () => {
        navigate("/detail", {
            state: {
                isbn: props.isbn
            }
        });
    }

    return(
        <div className={viewBook2Css.body}>
            <div className={viewBook2Css.title}>{props.bookname}</div>
            <div className={viewBook2Css.authors}>{props.authors}</div>
            <img className={viewBook2Css.img} src={props.bookImgURL} alt={'imgURL'} onClick={moveDetail} />
        </div>
    )
}

export default ViewBook2