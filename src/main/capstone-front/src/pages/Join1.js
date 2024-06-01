import joinCss1 from '../styles/Join1.module.css';
import logo from '../images/logo2.png'
import axios from "axios";
import {departmentList} from "../exportJS/departmentList";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Join1() {
    const navigate = useNavigate();
    const [formData, setFromdata] = useState({
            name: '',
            gender: '',

        })
    const a = () => {
        const url = '/api3/api/test'
        axios.get(url)
            .then((response) => {
                console.log(response);
                navigate("/");
                alert('연결 성공! 받아온 데이터: ' + response.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const push = (data) => {
        const url = '/api3/api/test'
        axios.post(url)
            .then((response) => {
                console.log(response);
                alert('연결 성공! 받아온 데이터: ' + response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div className={joinCss1.body}>
            <div>
            <form action={'/api/test'} method={'post'}>
                <input type={'submit'} />
            </form>
        </div>
            <div onClick={a}> 일단 클릭</div>
            <div className={joinCss1.head}>
                <img src={logo} alt={'a'}/>
                <p>회원가입</p>
            </div>
            <form className={joinCss1.context}>
                <div>
                    <p>이메일</p>
                    <input type={'email'}/>
                    <input type={'button'} value={'인증'} style={{marginLeft: '1rem'}}/>
                </div>
                <div>
                    <p>아이디</p>
                    <input type={'text'}/>
                </div>
                <div>
                    <p>비밀번호</p>
                    <input type={'password'}/>
                </div>
                <div>
                    <p>비밀번호 확인</p>
                    <input type={'password'}/>
                </div>
                <div>
                    <p>이름</p>
                    <input type={'text'}/>
                </div>
                <div>
                    <p>성별</p>
                    <input type={'text'}/>
                </div>
                <div>
                    <p>연령</p>
                    <input type={'text'}/>
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
                <input type={'button'} style={{margin: '0 auto', width: '100%'}}/>
            </form>
            <div></div>
        </div>
    )
}

export default Join1;