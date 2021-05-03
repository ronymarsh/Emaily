//SurveyField contains logic to render a single label and text input 
import React from 'react'

const SurveyField = ({input,label,meta:{error,touched}}) => {
    const field_css={
        display:'flex',
        flexDirection:'column'
    }
    const error_css={
        color:'red',
        marginBottom:'20px',
    }
    const label_css={
        fontSize:'26px'
    }
    const input_css={
        marginBottom:'5px',
        border:'none',
        borderBottom:'1px solid #c7c7c7',
        fontSize:'24px',
        fontFamily:'Calibri Light',
        outline:'none'
    }

    return (
        <div style={field_css}>
            <label style={label_css}>{label}</label>
            <input {...input} style={input_css}/>
            <div style={error_css}>
                {touched && error}
            </div>
        </div>
    )
}

export default SurveyField
