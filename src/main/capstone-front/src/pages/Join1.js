import joinCss1 from '../styles/Join1.module.css';
import logo from '../images/logo2.png'
import axios from "axios";
import {departmentList} from "../exportJS/departmentList";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";

function Join1() {
    const navigate = useNavigate();
    const onClickLogo = () => {
        navigate("/");
    }

    const email = useRef(null);
    const id = useRef(null);
    const name = useRef(null);
    const password = useRef(null);
    const re_password = useRef(null);
    const gender = useRef(null);
    const age = useRef(null);
    const departmentRef = useRef(null);

    const check_password = () => {

    }

    async function joinAPI() {
        try {
            const response = await axios.post('/join/add', {
                name: name.current.value,
                gender: gender.current.value,
                age: age.current.value,
                department_id: departmentRef.current.value,
                id: id.current.value,
                password: password.current.value,
                email: email.current.value,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            navigate("/login1");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={joinCss1.body}>
            <div className={joinCss1.head}>
                <img src={logo} alt={'a'} onClick={onClickLogo}/>
                <p>회원가입</p>
            </div>
            <div className={joinCss1.context}>
                <div>
                    <p>이메일</p>
                    <input type={'email'} ref={email}/>
                    <input type={'button'} value={'인증'} style={{marginLeft: '1rem'}}/>
                </div>
                <div>
                    <p>아이디</p>
                    <input type={'text'} ref={id}/>
                </div>
                <div>
                    <p>비밀번호</p>
                    <input type={'password'} ref={password}/>
                </div>
                <div>
                    <p>비밀번호 확인</p>
                    <input type={'password'} ref={re_password}/>
                </div>
                <div>
                    <p>이름</p>
                    <input type={'text'} ref={name}/>
                </div>
                <div>
                    <p>성별</p>
                    <input type={'text'} ref={gender}/>
                </div>
                <div>
                    <p>연령</p>
                    <input type={'text'} ref={age}/>
                </div>
                <div>
                    <p>학과</p>
                    <select defaultValue={0}> {/**DB 써서 해당 유저의 과 값 가져올 것.*/}
                        {
                            departmentList().map((department, index) => (
                                <option key={index} value={department.id} ref={departmentRef}>{department.name}</option>
                            ))
                        }
                    </select>
                </div>
                <input type={'button'} value={'회원 가입'} style={{margin: '0 auto', width: '100%'}} onClick={joinAPI}/>
            </div>
            <div></div>
        </div>
    )
}

export default Join1;