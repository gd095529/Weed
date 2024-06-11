import calendarCss from '../styles/component/Calendar.module.css';
import {useEffect, useState} from "react";
import left from '../images/mainImages/left.png'
import right from '../images/mainImages/right.png'

function Calendar() {
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const [tagArr, setTagArr] = useState([]);

    const addTagArr = (year, month) => {
        const tags = [];
        const monthDays = new Date(year, month - 1, 0).getDate();
        const startMonthDays = new Date(year, month - 1, 1).getDay();

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
            <div>
                {name}
            </div>
        )
    }

    useEffect(() => {
        addTagArr(2024, 6);
    }, []);

    return(
        <div className={calendarCss.body}>
            <div className={calendarCss.viewDateBox}>
                <div className={calendarCss.moveDate}>
                    <img src={left} alt={''}/>
                    <div>2024년</div>
                    <div>6월</div>
                    <img src={right} alt={''}/>
                </div>
                <div className={calendarCss.monthDate}>
                    4월 (Jun)
                </div>
                <div className={calendarCss.moveToday}>
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