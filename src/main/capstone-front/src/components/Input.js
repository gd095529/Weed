import inputCss from '../styles/component/Input.module.css';
import {useRef, useState} from "react";

function Input(props) {
    const [isFocus, setIsFocus] = useState(false);
    const [clickImg, setClickImg] = useState(false);
    const inputValue = useRef(null);

    const focus = () => {
        setIsFocus(true);
    }

    const blur = () => {
        if (props.useRef.current.value.length === 0) {
            setIsFocus(false);
        } else {
            setIsFocus(true);
        }
    }

    const clickImgFunc = () => {
        setClickImg(!clickImg);
    }

    return (
        <div className={inputCss.body}>
            <input type={clickImg ? "text" : props.type} placeholder={isFocus ? '' : props.placeholder}
                onFocus={focus} onBlur={blur} ref={props.useRef}
            />
            {
                isFocus && <p>{props.viewPlaceholder}</p>
            }
            {
                isFocus && <img onClick={clickImgFunc} src={clickImg ? props.url2 : props.url}/>
            }
        </div>
    )
}

export default Input;