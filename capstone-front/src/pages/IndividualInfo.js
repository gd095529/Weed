import indivCss from '../styles/IndividualInfo.module.css';
import {useState} from "react";

function IndividualInfo() {
    return (
        <div className={indivCss.body}>
            <div className={indivCss.infoBox}>
                <div className={indivCss.nameBox}>
                    <div className={indivCss.name}>이름</div>
                    <div
                        contentEditable={'true'}
                        className={indivCss.editName}></div>
                </div>
                <div className={indivCss.departmentBox}></div>
                <div className={indivCss.ageBox}></div>
                <div className={indivCss.genderBox}></div>
            </div>
        </div>
    )
}

export default IndividualInfo;