import customSearchCss from '../styles/CustomSearch.module.css';
import Header1 from "../components/Header1";
import {menuTypeConst} from "../constants/menuTypeConst";
import ListView1 from "../components/ListView1";
import {useRef, useState} from "react";
import * as lists from '../constants/exampleListOption';
import Calendar from "../components/Calendar";

function CustomSearch() {
    const [styles, setStyles] = useState({});
    const [checkIndex, setCheckIndex] = useState(null);
    const [shouldBeVisible, setShouldBeVisible] = useState(true);
    const [clickType, setClickType] = useState(null);
    const divRef = useRef({});

    const menuMouseEnter = (index) => {
        setStyles((prevStyles) => ({
            ...prevStyles,
            [index]: { ...prevStyles[index], border: '1px solid #0055ff' }
        }));
    }

    const menuMouseLeave = (index) => {
        setStyles((prevStyles) => ({
            ...prevStyles,
            [index]: { ...prevStyles[index], border: '1px solid black' }
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

    const listStruct = (index, listname) => {
        return (
            <div className={customSearchCss.lists}
                 style={{
                     minWidth: getDivWidth(index),
                     top: getDivBottom(index),
                     left: getDivLeft(index)
                 }}>
                {
                    listname.map((age, index) => (
                        <div className={customSearchCss.list}
                             key={index}
                             itemID={age.codeValue}>
                            {age.name}
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className={customSearchCss.body} onClick={bodyOnClick}>
            <div>
                <Header1 />
            </div>
            <div className={customSearchCss.menus}>
                {
                    menuTypeConst.map((menu, index) => (
                        <div key={index} className={customSearchCss.menu}
                             onMouseEnter={() => menuMouseEnter(index)}
                             onMouseLeave={() => menuMouseLeave(index)}
                             onClick={(event) => menuOnClick(index, menu.type, event)}
                             style={styles[index]}
                             ref={element => divRef.current[index] = element}
                        >
                            {menu.name}
                        </div>
                    ))

                }
            </div>
            {clickType === 'age' && listAge()}
            {clickType === 'gender' && listGender()}
            {clickType === 'region' && listRegion()}
            <div className={customSearchCss.results}>
                <div className={customSearchCss.resultName}>결과</div>
                <div className={customSearchCss.resultList}>
                    <ListView1 />
                    <ListView1 />
                    <ListView1 />
                    <ListView1 />
                    <ListView1 />
                    <ListView1 />
                </div>
            </div>
        </div>
    )
}

export default CustomSearch;