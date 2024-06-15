import customSearchCss from '../styles/CustomSearch.module.css';
import Header1 from "../components/Header1";
import {menuTypeConst} from "../constants/menuTypeConst";
import ListView1 from "../components/ListView1";
import {useEffect, useRef, useState} from "react";
import * as lists from '../constants/exampleListOption';
import Calendar from "../components/Calendar";
import ModalPopup from "../components/ModalPopup";
import {listsDtlKdc} from "../constants/exampleListOption";

function CustomSearch() {
    const [styles, setStyles] = useState({});
    const [checkIndex, setCheckIndex] = useState(null);
    const [shouldBeVisible, setShouldBeVisible] = useState(true);
    const [clickType, setClickType] = useState(null);
    const divRef = useRef({});
    const [selectAge, setSelectAge] = useState([]);
    const [selectGender, setSelectGender] = useState([]);
    const [selectRegion, setSelectRegion] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectDtlKdc, setSelectDtlKdc] = useState([]);

    const menuMouseEnter = (index) => {
        setStyles((prevStyles) => ({
            ...prevStyles,
            [index]: {...prevStyles[index], border: '1px solid #0055ff'}
        }));
    }

    const menuMouseLeave = (index) => {
        setStyles((prevStyles) => ({
            ...prevStyles,
            [index]: {...prevStyles[index], border: '1px solid black'}
        }));
    }

    const menuOnClick = (index, type, event) => {
        // setStyles({
        //     ...styles,
        //     [index]: { backgroundColor: '#a4c1fc' }
        // });
        event.stopPropagation();

        let diffIdx = index !== checkIndex;

        if (shouldBeVisible || diffIdx) {
            appearLists(type);
        } else {
            hideLists();
        }
        setCheckIndex(index);
    }

    const bodyOnClick = () => {
        setClickType(null);
        hideLists();
    }

    const hideLists = () => {
        setClickType(null);
        setShouldBeVisible(true);
    }

    const appearLists = (type) => {
        setClickType(type);
        setShouldBeVisible(false);
    }

    const getDivWidth = (index) => {
        return divRef.current[index]?.getBoundingClientRect().width;
    }

    const getDivBottom = (index) => {
        return divRef.current[index]?.getBoundingClientRect().bottom;
    }

    const getDivLeft = (index) => {
        return divRef.current[index]?.getBoundingClientRect().left;
    }

    const listAge = () => {
        return (
            <>
                {listStruct(0, lists.listsAge)}
            </>
        )
    }

    const listGender = () => {
        return (
            <>
                {listStruct(1, lists.listsGender)}
            </>
        )
    }

    const listRegion = () => {
        return (
            <>
                {listStruct(6, lists.listsRegion)}
            </>
        )
    }

    const listDate = (type) => {
        const index = type === 'startDt' ? '3' : '4';

        return (
            <div
                style={{top: getDivBottom(index), left: getDivLeft(index)}}
                className={customSearchCss.calendar}
            >
                {<Calendar clickDate={onSetDate} index={index}
                           initDate={new Date().getDate()} initMonth={new Date().getMonth()} initYear={new Date().getFullYear()}
                />}
            </div>
        )
    }

    const onSetDate = (selectDate, selectMonth, selectYear, type) => {
        selectMonth = selectMonth < 10 ? "0"+selectMonth : selectMonth;
        selectDate = selectDate < 10 ? "0"+selectDate : selectDate;
        const selectedDate = `${selectYear}-${selectMonth}-${selectDate}`;
        if (type === '3') {
            setStartDate(selectedDate);
            // 상태 업데이트 후 날짜 비교
            if (new Date(selectedDate) > new Date(endDate)) {
                alert("검색 종료 날짜가 검색 시작 날짜보다 빠릅니다!");
                setEndDate("");
            }
        } else {
            setEndDate(selectedDate);
            // 상태 업데이트 후 날짜 비교
            if (new Date(startDate) > new Date(selectedDate)) {
                alert("검색 종료 날짜가 검색 시작 날짜보다 빠릅니다!");
                setEndDate("");
            }
        }
    };


    const listStruct = (index, listname) => {
        return (
            <div className={customSearchCss.lists}
                 style={{
                     minWidth: getDivWidth(index),
                     top: getDivBottom(index),
                     left: getDivLeft(index)
                 }}>
                {
                    listname.map((list, idx) => (
                        <div className={customSearchCss.list}
                             key={idx}
                             itemID={list.codeValue}
                             onClick={() => onClickList(list.codeValue, list.name, index)}
                        >
                            {list.name}
                        </div>
                    ))
                }
            </div>
        )
    }

    const onClickList = (itemID, name, type) => {
        switch (type) {
            case 0 :
                setSelectAge([itemID, name]);
                break;
            case 1 :
                setSelectGender([itemID, name]);
                break;
            case 6 :
                setSelectRegion([itemID, name]);
                break;
        }
    }

    const modalPopup = (type) => {
        return (
            <ModalPopup type={type} list={type === 'dtl_kdc' ? listsDtlKdc : ''} onClick={onClickPopupItem} />
        )
    }

    const onClickPopupItem = (type, item, itemValue) => {
        if (type === 'dtl_kdc') {
            setSelectDtlKdc([itemValue, item]);
        }
        bodyOnClick();
    }



    return (
        <div className={customSearchCss.body} onClick={bodyOnClick}>
            <div>
                <Header1/>
            </div>
            <div className={customSearchCss.menus}>
                {
                    menuTypeConst.map((menu, index) => (
                        <div
                            key={index}
                            className={customSearchCss.menu}
                            onMouseEnter={() => menuMouseEnter(index)}
                            onMouseLeave={() => menuMouseLeave(index)}
                            onClick={(event) => menuOnClick(index, menu.type, event)}
                            style={styles[index]}
                            ref={element => divRef.current[index] = element}
                        >
                            {menu.type === 'age' && selectAge.length !== 0 && selectAge[1] !== '취소' ? (
                                <p style={{backgroundColor: selectAge.length !== 0 ? '#a4c1fc' : ''}}>{selectAge[1]}</p>
                            ) : menu.type === 'gender' && selectGender.length !== 0 && selectGender[1] !== '취소' ? (
                                <p style={{backgroundColor: selectGender.length !== 0 ? '#a4c1fc' : ''}}>{selectGender[1]}</p>
                            ) : menu.type === 'region' && selectRegion.length !== 0 && selectRegion[1] !== '취소' ? (
                                <p style={{backgroundColor: selectRegion.length !== 0 ? '#a4c1fc' : ''}}>{selectRegion[1]}</p>
                            ) : menu.type === 'startDt' && startDate.length !== 0 ? (
                                <p style={{backgroundColor: startDate.length !== 0 ? '#a4c1fc' : ''}}>{startDate}</p>
                            ) : menu.type === 'endDt' && endDate.length !== 0 ? (
                                <p style={{backgroundColor: endDate.length !== 0 ? '#a4c1fc' : ''}}>{endDate}</p>
                            ) : menu.type === 'dtl_kdc' && selectDtlKdc.length !== 0 ? (
                                <p style={{backgroundColor: selectDtlKdc.length !== 0 ? '#a4c1fc' : ''}}>{selectDtlKdc[1]}</p>
                            ) : (
                                <p>{menu.name}</p>
                            )}
                        </div>
                    ))
                }
            </div>
            {clickType === 'age' && listAge()}
            {clickType === 'gender' && listGender()}
            {clickType === 'region' && listRegion()}
            {clickType === 'startDt' && listDate('startDt')}
            {clickType === 'endDt' && listDate('endDt')}
            {clickType === 'dtl_kdc' && modalPopup('dtl_kdc')}
            {clickType === 'keyword' && modalPopup('keyword')}
            <div className={customSearchCss.results}>
                <div className={customSearchCss.resultName}>결과</div>
                <div className={customSearchCss.resultList}>
                    <ListView1/>
                    <ListView1/>
                    <ListView1/>
                    <ListView1/>
                    <ListView1/>
                    <ListView1/>
                </div>
            </div>
        </div>
    )
}

export default CustomSearch;