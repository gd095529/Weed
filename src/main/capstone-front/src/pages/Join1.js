import joinCss1 from '../styles/Join1.module.css';
import logo from '../images/logo2.png';
import axios from 'axios';
import { departmentList } from '../exportJS/departmentList';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
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
    const gender = useRef(null);
    const age = useRef(null);
    const departmentRef = useRef(null);

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

            navigate('/login1');
        } catch (error) {
            console.error(error);
        }
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
                        <select defaultValue={0}>
                            {
                                listsGender.slice(0, -1).map((gender, index) => (
                                    <option key={index} value={gender.codeValue}>{gender.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={joinCss1.field}>
                        <p>연령</p>
                        <select defaultValue={0}>
                            {
                                listsAge.slice(0, -1).map((age, index) => (
                                    <option key={index} value={age.codeValue}>{age.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={joinCss1.field}>
                        <p>학과</p>
                        <select defaultValue={0} ref={departmentRef}>
                            {
                                departmentList().map((department, index) => (
                                    <option key={index} value={department.id}>{department.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={joinCss1.btnGroup}>
                        <input type="button" value="회원 가입" className={joinCss1.btn} onClick={joinAPI} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Join1;
