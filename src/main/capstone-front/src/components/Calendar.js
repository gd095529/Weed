import calendarCss from '../styles/component/Calendar.module.css';
import {useEffect, useImperativeHandle, useRef, useState} from "react";
import left from '../images/whiteLeft.png'
import right from '../images/whiteRight.png'

function Calendar(props) {
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const [tagArr, setTagArr] = useState([]);
    const [selectDate, setSelectDate] = useState(props.initDate);
    const [selectYear, setSelectYear] = useState(props.initYear);
    const [selectMonth, setSelectMonth] = useState(props.initMonth);
    const [isFS, setIsFS] = useState(false);
    const initialRender = useRef(true);

    const stopBubble = (event) => {
        event.stopPropagation();
    }

    const addTagArr = (year, month) => {
        const tags = [];
        // month + 1을 한 이유: 이전 달의 마지막 날짜를 구하기 때문
        const monthDays = new Date(year, month + 1, 0).getDate();
        const startMonthDays = new Date(year, month, 1).getDay();

        for (let i = 0; i < 7; i++) {
            tags.push(tagElements(weekDays[i]));
        }

        for (let i = 0; i < startMonthDays; i++) {
            tags.push(tagElements(""));
        }

        for (let i = 0; i < monthDays; i++) {
            tags.push(tagElements(i + 1));
        }

        for (let i = tags.length; i < 49; i++) {
            tags.push(tagElements(""));
        }

        setTagArr(tags);
    }

    const tagElements = (name) => {
        return (
            <div style={{backgroundColor: selectDate === name ? '#a4c1fc' : ''}}
                 onClick={() => selectDay(name)}>
                {name}
            </div>
        )
    }

    useEffect(() => {
        addTagArr(selectYear, selectMonth);
    }, [selectYear, selectMonth, selectDate]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            if (props.clickDate) {
                props.clickDate(selectDate, selectMonth + 1, selectYear, props.index);
            }
        }
    }, [isFS]);

    const leftMove = () => {
        if (selectMonth < 1 ) {
            setSelectMonth(11);
            setSelectYear(selectYear - 1);
        } else {
            setSelectMonth(selectMonth - 1);
        }
    }

    const rightMove = () => {
        if (selectMonth > 10) {
            setSelectMonth(0);
            setSelectYear(selectYear + 1);
        } else {
            setSelectMonth(selectMonth + 1);
        }
    }

    const moveToday = () => {
        let todayDate = new Date().getDate();
        let todayYear = new Date().getFullYear();
        let todayMonth = new Date().getMonth();

        setSelectYear(todayYear);
        setSelectMonth(todayMonth);
        setSelectDate(todayDate);
        setIsFS(!isFS);
    }

    const selectDay = (day) => {
        if (day === "") {
            day = 1;
        }
        setSelectDate(day);
        setIsFS(!isFS);
    }

    return(
        <div className={calendarCss.body} onClick={(event ) => stopBubble(event)}>
            <div className={calendarCss.viewDateBox}>
                <div className={calendarCss.moveDate}>
                    <img src={left} alt={''} onClick={leftMove}/>
                    <div>{selectYear}년</div>
                    <div>{selectMonth + 1}월</div>
                    <img src={right} alt={''} onClick={rightMove}/>
                </div>
                {/*<div className={calendarCss).monthDate}>
                    {selectMonth+1}월
                </div> */}
                <div className={calendarCss.moveToday} onClick={moveToday}>
                    오늘 날짜 선택
                </div>
            </div>
            <div className={calendarCss.clickDateBox}>
                {
                    tagArr.map((element) => (
                        element
                    ))
                }
            </div>
        </div>
    )
}

export default Calendar;