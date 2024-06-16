import listView1Css from '../styles/component/ListView1.module.css';
import {useNavigate} from "react-router-dom";

function ListView1(props) {
    const navigate = useNavigate();

    const moveDetail = () => {
        navigate("/detail", {
            state: {
                isbn: props.isbn
            }
        });
    }

    console.log(props.bookname);
    return (
        <div className={listView1Css.body} onClick={moveDetail}>
            <div className={listView1Css.imgBox}>
                <img src={props.bookImgURL} alt={''} className={listView1Css.bookImg}/>
            </div>
            <div className={listView1Css.contentsBox}>
                <div className={listView1Css.titleBox}>
                    <div className={listView1Css.bookname}>{props.bookname}</div>
                    <div className={listView1Css.author}>{props.author}</div>
                    <div className={listView1Css.publisher}>{props.publisher}</div>
                </div>
                <div className={listView1Css.contents}>
                    <div className={listView1Css.description}>{props.description}</div>
                </div>
            </div>
        </div>
    )
}

export default ListView1;