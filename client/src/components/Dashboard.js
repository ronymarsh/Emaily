import React from 'react'
import {Link} from 'react-router-dom'
import SurveyList from './surveys/SurveyList'
import {VscAdd} from 'react-icons/vsc'

const Dashboard = () => {
    const wrapper_css={
        display:'flex',
        flexDirection:'column',
        margin:'1% 20%'
    }

    const addBtn_css={
        width:'70px',
        height:'70px',
        border:'none',
        borderRadius:'50%',
        fontSize:'30px',
        backgroundColor:'#ff9999',
        color:'white',
        position:'fixed',
        top:'90%',
        right:'15%',
        cursor:'pointer',
        boxShadow: '0px 5px 5px 0px rgba(0, 0, 0, 10%), 0 10px 10px 0 rgba(0, 0, 0, 10%)'
    }
    return (
        <div style={wrapper_css}>
            <SurveyList/>

            <div className='fixed-action-btn'>
                <Link to='/surveys/new'>
                    <button style={addBtn_css}><VscAdd style={{position:'relative',top:'2px'}} /></button>
                </Link>
            </div>
            
        </div>
    )
}

export default Dashboard
