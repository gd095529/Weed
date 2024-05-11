import navCss from '../styles/component/Nav.module.css'; 
import trophy from '../images/mainImages/trophy.png';
import fire from '../images/mainImages/fire.png';
import setting from '../images/mainImages/setting.png';

const guest = [
    "인기 도서",
    "급상승 도서",
]
const guestImg = [
    trophy,
    fire
]

const login = [
    "인기 도서",
    "급상승 도서",
    "학과 인기 도서",
]

function Nav() {
    return (
        <div className={navCss.body}>
            {guest.map((value, index) => (
                <a key={index} href='/'>
                    <div className={`${navCss.list} ${navCss[`list${index}`]}`}>
                        <img src={guestImg[index]} alt={value}/>
                        <p>{value}</p>
                    </div>
                </a>
            ))}
            <a href='/'>
                <div className={navCss.optionsBox}>
                    <img src={setting} alt='설정img' />
                    <p>설정</p>
                </div>
            </a>
        </div>
    )
}

export default Nav;