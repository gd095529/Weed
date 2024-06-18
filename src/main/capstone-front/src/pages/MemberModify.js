import memberModifyCss from '../styles/MemberModify.module.css';
import Header1 from "../components/Header1";
import { departmentList } from "../exportJS/departmentList";
import { listsAge, listsGender } from "../constants/exampleListOption";
import {useEffect, useState} from "react";
import {departmentAPI} from "../api/department";
import axios from "axios";
import {sessionMIDAPI} from "../api/sessionMIDAPI";
import PromptPW from "../components/PromptPW";
import PromptPW2 from "../components/PromptPW2";

function MemberModify() {
    const [departments, setDepartments] = useState([]);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            const a = await departmentAPI();
            setDepartments(a);
            console.log(a);
        };
        fetchDepartments();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (password.length > 0) {
                try {
                    const config = {
                        password: password
                    };
                    const userData = await axios.get('/join/modify', { params: config, withCredentials: true });
                    console.log(userData);
                    setUser(userData.data);
                    console.log(user);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchUserData();
    }, [password]);

    const putPassword = (password) => {
        setPassword(password);
    };

    return (
        <div className={memberModifyCss.body}>
            <div className={memberModifyCss.header}>
                <Header1 />
            </div>
            <div className={memberModifyCss.card}>
                <div className={memberModifyCss.context}>
                    <div className={memberModifyCss.titleContainer}>
                        <div className={memberModifyCss.title}>
                            내 정보 수정
                            <img
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmF81H2faUvgPpBs56XmwMliUszrDZ3oCiZQ&s'}
                                alt="프로필 이미지"
                                className={memberModifyCss.profileImage}
                            />
                        </div>
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>이메일</p>
                        <input type={'text'} defaultValue={'email@naver.com'} disabled={true} />
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>아이디</p>
                        <input type={'text'} defaultValue={'id'} disabled={true} />
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>이름</p>
                        <input type={'text'} />
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>성별</p>
                        <select defaultValue={0}>
                            {
                                listsGender.slice(0, -1).map((gender, index) => (
                                    <option key={index} value={gender.codeValue}>{gender.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>연령</p>
                        <select defaultValue={0}>
                            {
                                listsAge.slice(0,-1).map((age, index) => (
                                    <option key={index} value={age.codeValue}>{age.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>학과</p>
                        <select defaultValue={0}>
                            {
                                departments.map((department, index) => (
                                    <option key={index} value={department.department_id}>{department.department}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={memberModifyCss.buttonContainer}>
                        <div className={memberModifyCss.button}>수정하기</div>
                        <div className={memberModifyCss.button}>취소</div>
                    </div>
                </div>
            </div>
            {password.length === 0 && <PromptPW2 putPassword={putPassword}/>}
        </div>
    )
}

export default MemberModify;
