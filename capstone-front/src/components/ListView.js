import ViewBook1 from "./ViewBook1";
import more from "../images/mainImages/showMore.png";
import left from '../images/mainImages/left.png';
import right from '../images/mainImages/right.png';
import {useEffect, useState} from "react";

function ListView(props) {
    const [isOver, setOver] = useState(false); // 다음 리스트로 넘길 이미지가 보이게 하기위함
    const [index, setIndex] = useState(1); // 현재 리스트가 몇 번째를 참조하는지 확인
    const [books, setBooks] = useState([]); // api에서 뽑아온 값을 index에 맞게 보여주기 위한 값

    const mouseLeave = () => {
        return setOver(false);
    }

    const mouseOver = () => {
        return setOver(true);
    }

    const clickRight = () => {
        setIndex(index + 1);
        // 5페이지를 보여줄 예정
        // 만약 5페이지를 넘어가게 된다면 다시 첫 번재 페이지로 이동
        if (index === 5) {
            setIndex(1);
        }
    }

    const clickLeft = () => {
        setIndex(index - 1);
        // 5페이지를 보여줄 예정
        // 만약 1페이지를 넘어가게 된다면 다시 다섯 번재 페이지로 이동
        if (index === 1) {
            setIndex(5);
        }
    }
    // Main1에서 가져온 api 값을 index에 맞게 배열에서 뽑아냄.
    // index가 변화면 다시 랜더링.
    useEffect(() => {
        const books = [];
        // index의 값에 따라 0~4, 5~9, 10~14 ... 이렇게 값을 뽑기 위함
        for (let i = index * 5 - 5; i < index * 5 ; i++) {
            books.push(props.books[i]);
        }
        setBooks(books);
    }, [index])

    return (
        <div style={bodyStyle} onMouseLeave={mouseLeave} onMouseOver={mouseOver}>
            <div style={{display: "flex", alignItems: "center"}}>
                <img src={props.icon} alt={props.icon} style={iconStyle}/>
                <div style={{fontFamily: "TAE"}}>{props.theme} ({index}/5)</div>
            </div>
            <div style={booksStyle}>
            {
                // useState에 추가한 books에 값이 다 들어가면 한 번에 나오게 하는 코드
                books.map((book, index) => (
                    <ViewBook1 key={index} url={book.url} title={book.title} auth={book.author}/>
                ))
            }
            </div>
            <img src={more} alt={'more'} style={moreStyle} onClick={props.func}/>
            {
                // 마우스가 ListView 전체에 올라가게 되면 이미지 나오게 하는 코드
                isOver &&
                <>
                    <img src={left} alt={'left'} style={leftStyle} onClick={clickLeft}/>
                    <img src={right} alt={'right'} style={rightStyle} onClick={clickRight}/>
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