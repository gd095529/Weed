function ViewBook1(props) {
    return (
        <div style={bodyStyle}>
            <img src={props.url} alt={props.url} style={imgStyle} />
            <p style={boldStyle}>{props.title}</p>
            <p style={pStyle}>{props.auth}</p>
        </div>
    )
}

const bodyStyle = {
    width: '10rem',
    height: '17rem',
    border: '1px solid green',
    marginTop: '1rem'
}

const imgStyle = {
    width: '100%',
    height: '70%'
}

const pStyle = {
    overflow:'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginTop: '1rem',
    fontSize: '13px',
    fontFamily: "SUITE"
}

const boldStyle = {
    ...pStyle,
    fontWeight: 'bold'
}
export default ViewBook1;