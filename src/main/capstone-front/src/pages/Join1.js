import joinCss1 from '../styles/Join1.module.css';
import logo from '../images/logo2.png';
import axios from 'axios';
import { departmentList } from '../exportJS/departmentList';
import { useNavigate } from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import { TextField, FormControl, InputAdornment, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import {listsAge, listsGender} from "../constants/exampleListOption";

function Join1() {
    const navigate = useNavigate();

    const onClickLogo = () => {
        navigate('/');
    };

    const email = useRef(null);
    const id = useRef(null);
    const name = useRef(null);
    const password = useRef(null);
    const re_password = useRef(null);
    const [gender, setGender] = useState(0);
    const [age, setAge] = useState(0);
    const [department, setDepartment] = useState(1);
    const [btnClick, setBtnClick] = useState(false);

    async function joinAPI() {

        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        const isEmailValid = email_regex.test(email.current.value);

        if (!isEmailValid) {
            alert('이메일 형식에 맞게 수정해주세요');
            return;
        }

        try {

            const response = await axios.post('/join/add', {
                name: name.current.value,
                gender: gender,
                age: age,
                department_id: department,
                id: id.current.value,
                password: password.current.value,
                email: email.current.value,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            navigate('/login1');
        } catch (error) {
            alert('id 또는 이메일이 중복됩니다.');
        }
    }


    const genderChange = (event) => {
        setGender(event.target.value);
    }

    const ageChange = (event) => {
        setAge(event.target.value);
    }

    const departmentChange = (event) => {
        setDepartment(event.target.value);
    }

    const clickBtn = () => {
        setBtnClick(!btnClick);
        joinAPI();
    }

    return (
        <div className={joinCss1.body}>
            <div className={joinCss1.container}>
                <div className={joinCss1.head}>
                    <img src={logo} alt="logo" onClick={onClickLogo} />
                    <p>회원가입</p>
                </div>
                <div className={joinCss1.context}>
                    <div className={joinCss1.field}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField
                                label="이메일"
                                type="email"
                                inputRef={email}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                className={joinCss1.btnInline}
                                            >
                                                <CheckIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                    </div>
                    <div className={joinCss1.field}>
                        <TextField
                            label="아이디"
                            type="text"
                            inputRef={id}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className={joinCss1.field}>
                        <TextField
                            label="비밀번호"
                            type="password"
                            inputRef={password}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className={joinCss1.field}>
                        <TextField
                            label="비밀번호 확인"
                            type="password"
                            inputRef={re_password}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className={joinCss1.field}>
                        <TextField
                            label="이름"
                            type="text"
                            inputRef={name}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className={joinCss1.field}>
                        <p>성별</p>
                        <select defaultValue={0} onChange={(event) => genderChange(event)}>
                            {
                                listsGender.slice(0, -1).map((gender, index) => (
                                    <option key={index} value={gender.name} >{gender.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={joinCss1.field}>
                        <p>연령</p>
                        <select defaultValue={0} onChange={(event) => ageChange(event)}>
                            {
                                listsAge.slice(0, -1).map((age, index) => (
                                    <option key={index} value={age.codeValue}>{age.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={joinCss1.field}>
                        <p>학과</p>
                        <select defaultValue={0} onChange={(event) => departmentChange(event)}>
                            {
                                departmentList().map((department, index) => (
                                    <option key={index} value={department.id}>{department.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={joinCss1.btnGroup}>
                        <input type="button" value="회원 가입" className={joinCss1.btn} onClick={clickBtn} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Join1;
