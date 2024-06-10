import search1Css from '../styles/CustomSearch.module.css';
import Header1 from "../components/Header1";
import {menuTypeConst} from "../constants/menuTypeConst";
import ListView1 from "../components/ListView1";

function CustomSearch() {
    return (
        <div className={search1Css.body}>
            <div>
                <Header1 />
            </div>
            <div className={search1Css.menus}>
                {
                    menuTypeConst.map((menu, index) => (
                        <div key={index} className={search1Css.menu}>
                            {menu.name}
                        </div>
                    ))
                }
            </div>
            <div className={search1Css.results}>
                <div className={search1Css.resultName}>결과</div>
                <div className={search1Css.resultList}>
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