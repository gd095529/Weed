import ViewBook1 from "./ViewBook1";
import more from "../images/mainImages/showMore.png";
import left from '../images/mainImages/left.png';
import right from '../images/mainImages/right.png';
import {useState} from "react";

function ListView(props) {
    const [isOver, setOver] = useState(false);
    const mouseLeave = () => {
        return setOver(false);
    }
    const mouseOver = () => {
        return setOver(true);
    }
    return (
        <div style={bodyStyle} onMouseLeave={mouseLeave} onMouseOver={mouseOver}>
            <div style={{display: "flex", alignItems: "center"}}>
                <img src={props.icon} alt={props.icon} style={iconStyle}/>
                <div style={{fontFamily: "TAE"}}>{props.theme}</div>
            </div>
            <div style={booksStyle}>
            {
                props.books.map((book, index) => (
                    <ViewBook1 key={index} url={book.url} title={book.title} auth={book.author}/>
                ))
            }
            </div>
            <img src={more} alt={'more'} style={moreStyle} onClick={props.func}/>
            {
                isOver &&
                <>
                    <img src={left} alt={'left'} style={leftStyle} onClick={props.clickLeft}/>
                    <img src={right} alt={'right'} style={rightStyle} onClick={props.clickRight}/>
                </>
            }
        </div>
    )
}

const bodyStyle = {
    width: '100%',
    height: '100%',
    position: "relative"
}

const booksStyle = {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
}

const moreStyle = {
    width: '2rem',
    height: '2rem',
    position: 'absolute',
    top: "0",
    right: "0"
}

const iconStyle = {
    width: '1.8rem',
    height: '1.8rem'
}

const leftStyle = {
    width: '2rem',
    height: '2rem',
    position: 'absolute',
    top: '50%',
    left: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
}

const rightStyle = {
    width: '2rem',
    height: '2rem',
    position: 'absolute',
    top: '50%',
    right: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
}

export default ListView;