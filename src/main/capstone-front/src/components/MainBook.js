import mainCss from "../styles/Main.module.css";
import hereBar from '../images/hereBar.png';
import noBar from '../images/noBar.png';
import {useState} from "react";

function MainBook(props) {
    let top, middle;
    const eventImg = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUAIyndA7gYDd9HiAzAg3VR73AAUs9E8y4Dg&s',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/%EC%98%A8%EB%9D%BC%EC%9D%B8%20%EC%9D%B4%EC%9A%A9%EA%B5%90%EC%9C%A1%20%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/%EC%9D%B4%EB%8B%AC%EC%9D%98-%ED%95%99%EA%B3%BC%EB%B3%84-%EC%B6%94%EC%B2%9C%EC%9E%A1%EC%A7%80202405.jpg',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/darakwon.jpg',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/c93a5135c40f48a8bd90c41c4cbecd2a.png',
    ]

    // select를 입맛에 맞춰서 넣을 수 있도록
    const customSelect = (options) => {
        return (
            <select>
                {options.map((option, index) => (
                     <option key={index}>
                         {option}
                     </option>
                ))}
            </select>
        )
    }

    // IndexBar를 통해 어떤 Index가 활성화 된 지 알려주는 함수
    // 근데 barCount에 숫자 넣는게 아니라 배열 넣어야 함.
    const setIndexBar = (barCount) => {
        return (
            <>
                {
                    barCount.map((count, index) => (
                        <img key={index}  src={props.index == count ? hereBar : noBar} alt={'bar'}/>
                    ))
                }
            </>
        )
    }

    // barCount 배열로 넣을 것
    let barCount = [];

    // type에 맞게 각각 정의.
    if (props.type === 'event') {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/2558/2558944.png'} alt={'event'}/>
                <p>영진전문대 도서관 이벤트</p>
            </div>;
        middle = <img className={mainCss.middle}
                      src={eventImg[props.index - 1]}
                      alt={''} style={{margin: '0 auto'}}/>;
    } else if (props.type === "age") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        const age = ["20대", "30대"];
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/4994/4994683.png'} alt={'event'}/>
                <p>{customSelect(age)} 인기 도서</p>
            </div>
    } else if (props.type === "gender") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        const gender = ["남성", "여성"];
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/3939/3939785.png'} alt={'event'}/>
                <p>{customSelect(gender)} 인기 도서</p>
            </div>
    } else if (props.type === "loan") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/5956/5956911.png'} alt={'event'}/>
                <p>대출 인기 도서</p>
            </div>
    } else if (props.type === "department") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        const department = ["1", "2"];
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/5027/5027398.png'} alt={'event'}/>
                <p>{customSelect(department)} 인기 도서</p>
            </div>
    } else {
        top = "error!";
    }

    return (
        <>
            {top}
            {middle}
            <div className={mainCss.bottom}>
                {setIndexBar(barCount)}
            </div>
        </>
    )
}

export default MainBook;