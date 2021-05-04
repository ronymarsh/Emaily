import {Link} from 'react-router-dom'

const Landing = () => {
    const wrapper_css={
        margin:'1% 5%',
        textAlign:'center'
    }
    const startBtn_css={
        backgroundColor:'#ff9999',
        border:'none',
        color:'white',
        padding:'2% 5%',
        cursor:'pointer',
        fontSize:'16px'
    }
    return (
        <div style={wrapper_css}>
            <h1>
                Emaily!
            </h1>
            <p>Collect feedback from your users</p>
            <Link to='/surveys'>
                <button style={startBtn_css}>GET STARTED</button>
            </Link>
        </div>
    )
}

export default Landing
