import indivCss from '../styles/IndividualInfo.module.css';

function IndividualInfo() {
    return (
        <div className={indivCss.body}>
            <div className={indivCss.infoBox}>
                <div className={indivCss.nameBox}>
                    <div>이름</div>
                    <input type='text' placeholder='이름 입력'></input>
                </div>
                <div className={indivCss.departmentBox}></div>
                <div className={indivCss.ageBox}></div>
                <div className={indivCss.genderBox}></div>
            </div>
        </div>
    )
}

export default IndividualInfo;