import mainCss from '../styles/Main.module.css';
import Header from '../components/Header';
import Nav from '../components/Nav';
import ViewBook from '../components/ViewBook';

function Main() {
    return (
        <div className={mainCss.body}>
            <div className={mainCss.header}>
                <Header />
            </div>
            <div className={mainCss.nav}>
                <Nav />
            </div>
            <div className={mainCss.content}>
                <ViewBook />              
            </div>
        </div>
    )
}

export default Main;