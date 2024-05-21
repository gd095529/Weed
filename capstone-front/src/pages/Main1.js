import Header1 from '../components/Header1';

function Main1() {
    return (
        <div style={bodyStyle}>
            <Header1 />
        </div>
    )
}

const bodyStyle = {
    border: '1px solid black',
    width: '60%',
    height: '100%',
    margin: '0 auto',
}

export default Main1;