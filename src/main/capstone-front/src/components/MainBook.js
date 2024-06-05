import mainCss from "../styles/Main.module.css";
import hereBar from '../images/hereBar.png';
import noBar from '../images/noBar.png';
import {useState} from "react";

function MainBook(props) {
    const [isOpen, setIsOpen] = useState(false);

    let top, middle;
    const eventImg = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUAIyndA7gYDd9HiAzAg3VR73AAUs9E8y4Dg&s',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/%EC%98%A8%EB%9D%BC%EC%9D%B8%20%EC%9D%B4%EC%9A%A9%EA%B5%90%EC%9C%A1%20%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/%EC%9D%B4%EB%8B%AC%EC%9D%98-%ED%95%99%EA%B3%BC%EB%B3%84-%EC%B6%94%EC%B2%9C%EC%9E%A1%EC%A7%80202405.jpg',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/darakwon.jpg',
        'http://lib.yjc.ac.kr/WebYJC/data/Images/1view/c93a5135c40f48a8bd90c41c4cbecd2a.png',
    ]

    const customSelect = (options) => {

        const defaultSelectStyle = {
            lineHeight: '1rem',
            height: '1rem',
            display: 'inline-block',
            fontSize: '1rem',
            cursor: 'pointer',
            position: 'relative'
        }

        const optionStyles = {
            display: isOpen ? 'block' : 'none',
            position: 'absolute',
            backgroundColor: 'white',
            border: '1px solid gray',
            zIndex: '1'
        }

        const openOption = () => {
            setIsOpen(true);
        }

        const closeOption = () => {
            setIsOpen(false);
        }

        return (
            <div style={defaultSelectStyle}>
                <div onClick={openOption}>{options[0]}<span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>∨</span></div>
                <div style={optionStyles}>
                    {options.map((option, index) => (
                        <div key={index} onClick={closeOption} >{option}</div>
                    ))}
                </div>
            </div>
        )
    }

    // IndexBar를 통해 어떤 Index가 활성화 된 지 알려주는 함수
    // 근데 barCount에 숫자 넣는게 아니라 배열 넣어야 함.
    const setIndexBar = (barCount) => {
        return (
            <>
                {
                    barCount.map((count, index) => (
                        <img key={index} src={props.index == count ? hereBar : noBar} alt={'bar'}
                             onClick={() => props.funtion(index + 1)}
                        />
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
        middle =
            <img className={mainCss.middle}
                 src={eventImg[props.index - 1]}
                 alt={''} style={{margin: '0 auto'}}
            />;
    } else if (props.type === "age") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        const age = ["20대", "30대"];
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/4994/4994683.png'} alt={'event'}/>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>{customSelect(age)} 인기 도서</div>
            </div>
        middle =
            <div className={mainCss.middle}>

            </div>
    } else if (props.type === "gender") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/3939/3939785.png'} alt={'event'}/>
                <p>성별 인기 도서</p>
            </div>
        middle =
            <div className={mainCss.middle} style={{display: 'flex'}}>
                <div style={{
                    width: '50%',
                    borderRight: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    <img src={'https://cdn.icon-icons.com/icons2/2248/PNG/512/gender_male_icon_137554.png'} alt={''}
                         style={{width: '1.5rem', height: '1.5rem'}}
                    />
                    <div>남성</div>
                </div>
                <div style={{width: '50%', display: 'flex', justifyContent: 'center', gap: '0.5rem'}}>
                    <img src={'https://cdn.icon-icons.com/icons2/1914/PNG/512/femalesymbol_121533.png'} alt={''}
                         style={{width: '1.3rem', height: '1.3rem', marginLeft: '1rem'}}
                    />
                    <div>여성</div>
                </div>
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
        middle =
            <div className={mainCss.middle}>

            </div>
    } else if (props.type === "department") {
        for (let i = 1; i <= props.initIndex; i++) {
            barCount.push(i);
        }
        const department = ["컴퓨터정보계열", "IT"];
        top =
            <div className={mainCss.top}>
                <img src={'https://cdn-icons-png.flaticon.com/512/5027/5027398.png'} alt={'event'}/>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>{customSelect(department)}인기 도서</div>
            </div>
        middle =
            <div className={mainCss.middle}>

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