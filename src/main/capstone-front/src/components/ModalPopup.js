import modalPopupCss from '../styles/component/ModalPopup.module.css';
import {useEffect, useState} from "react";

function ModalPopup(props) {
    const [searchText, setSearchText] = useState('');
    const [itemList, setItemList] = useState(props.list);

    const stopBubble = (event) => {
        event.stopPropagation();
    }

    const search = (event) => {
        setSearchText(event.target.value);
    }

    const clickItem = (name, value) => {
        props.onClick(props.type, name, value);
    }

    useEffect(() => {
        if (searchText === '') {
            setItemList(props.list);
        } else {
            const filter = props.list.filter(item =>
                item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            );
            setItemList(filter);
        }
    }, [searchText]);

    return (
        <div className={modalPopupCss.body} >
            <div className={modalPopupCss.popup} onClick={(event ) => stopBubble(event)}>
                <div className={modalPopupCss.searchBox}>
                    <input className={modalPopupCss.search} type={'text'} placeholder={props.type === 'dtl_kdc' ? '세부주제 검색' : "키워드 검색"}
                            onChange={search}
                    />
                </div>
                <div className={modalPopupCss.selectBox}>
                    {
                        itemList.map((item, index) => (
                            <div key={index} itemID={item.codeValue} onClick={() => clickItem(item.name, item.codeValue)}>
                                {item.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalPopup