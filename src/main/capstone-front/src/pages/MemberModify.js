import memberModifyCss from '../styles/MemberModify.module.css';
import Header1 from "../components/Header1";
import {departmentList} from "../exportJS/departmentList";

function MemberModify() {
    return (
        <div className={memberModifyCss.body}>
            <div className={memberModifyCss.header}>
                <Header1/>
            </div>
            <div className={memberModifyCss.context}>
                <div>내 정보 수정</div>
                <div>
                    <p>이메일</p>
                    <input type={'text'} defaultValue={'email@naver.com'} disabled={true}/>
                </div>
                <div>
                    <p>아이디</p>
                    <input type={'text'} defaultValue={'id'} disabled={true}/>
                </div>
                <div>
                    <p>비밀번호</p>
                    <input type={'password'} defaultValue={'password'}/>
                </div>
                <div>
                    <p>비밀번호 확인</p>
                    <input type={'password'} defaultValue={'password'}/>
                </div>
                <div>
                    <p>이름</p>
                    <input type={'text'} defaultValue={'이름'}/>
                </div>
                <div>
                    <p>성별</p>
                    <input type={'text'} defaultValue={'남'}/>
                </div>
                <div>
                    <p>연령</p>
                    <input type={'text'} defaultValue={'20'}/>
                </div>
                <div>
                    <p>학과</p>
                    <select defaultValue={0}> {/**DB 써서 해당 유저의 과 값 가져올 것.*/}
                        {
                            departmentList().map((department, index) => (
                                <option key={index} value={department.id}>{department.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <div>수정하기</div>
                    <div>취소</div>
                </div>
            </div>
        </div>
    )
}

export default MemberModify;