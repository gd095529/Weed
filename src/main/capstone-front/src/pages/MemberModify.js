import memberModifyCss from '../styles/MemberModify.module.css';
import Header1 from "../components/Header1";
import { departmentList } from "../exportJS/departmentList";
import { listsAge, listsGender } from "../constants/exampleListOption";
import {useEffect, useRef, useState} from "react";
import {departmentAPI} from "../api/department";
import axios from "axios";
import {sessionMIDAPI} from "../api/sessionMIDAPI";
import PromptPW from "../components/PromptPW";
import PromptPW2 from "../components/PromptPW2";
import {useNavigate} from "react-router-dom";
import {loginName} from "../redux/slice/loginName";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/slice/loginSlice";

function MemberModify() {
    const [departments, setDepartments] = useState([]);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([]);
    const nameRef = useRef();
    const [gender, setGender] = useState('남성');
    const [age, setAge] = useState(0);
    const [department, setDepartment] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const genderChange = (event) => {
        setGender(event.target.value === 0 ? '남성' : '여성');
    }

    const ageChange = (event) => {
        setAge(event.target.value);
    }

    const departmentChange = (event) => {
        setDepartment(event.target.value);
    }


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
                    setGender(userData.data.gender === 0 ? '남성' : '여성');
                    setAge(userData.data.age);
                    setDepartment(userData.data.department_id);
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

    const clickModify = async () => {
        const member = {
            email: user.email,
            name: nameRef.current.value,
            id: user.id,
            gender: gender,
            age: age,
            department_id: department,
            member_id: user.member_id,
            password: user.password,
            password_key: user.password_key,
            mode: user.mode
        }
        try {
            const response = await axios.put('/join/modify', member, );
            alert(response.data);
            dispatch(loginName(nameRef.current.value)); // 추출한 데이터를 Redux로 디스패치합니다.
            navigate('/');
        } catch (e) {
            console.log(e);
        }

    }

    const clickCancel = () => {
        navigate('/');
    }

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
                        <input type={'text'} defaultValue={user.email} disabled={true} />
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>아이디</p>
                        <input type={'text'} defaultValue={user.id} disabled={true} />
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>이름</p>
                        <input type={'text'} defaultValue={user.name} ref={nameRef}/>
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>성별</p>
                        <select value={user.gender === '남성' ? 0 : 1} onChange={(event) => genderChange(event)}>
                            {
                                listsGender.slice(0, -1).map((gender, index) => (
                                    <option key={index} value={gender.codeValue}>{gender.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>연령</p>
                        <select value={user.age} onChange={(event) => ageChange(event)}>
                            {
                                listsAge.slice(0,-1).map((age, index) => (
                                    <option key={index} value={age.codeValue}>{age.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={memberModifyCss.field}>
                        <p className={memberModifyCss.label}>학과</p>
                        <select value={11} onChange={(event) => departmentChange(event)}>
                            {
                                departments.map((department, index) => (
                                    <option key={index} value={department.department_id}>{department.department}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={memberModifyCss.buttonContainer}>
                        <div className={memberModifyCss.button} onClick={clickModify}>수정하기</div>
                        <div className={memberModifyCss.button} onClick={clickCancel}>취소</div>
                    </div>
                </div>
            </div>
            {password.length === 0 && <PromptPW2 putPassword={putPassword}/>}
        </div>
    )
}

export default MemberModify;
