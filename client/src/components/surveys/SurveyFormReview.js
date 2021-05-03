//SurveyFormReview shows users their form inputs for review 
import _ from 'lodash'
import {connect} from 'react-redux'
import formFields from './formFields'
import {withRouter} from 'react-router-dom'
import * as actions from '../../actions'
import {VscMail} from 'react-icons/vsc'

const SurveyFormReview = ({onCancel,formValues,submitSurvey,history}) => {
    
    const wrapper_css={
        margin:'1% 20%'
    }

    const confirm_css={
        fontSize:'24px',
        fontWeight:'bold'
    }
    const field_css={
        margin:'1% 1% 1% 0',
        
    }

    const label_css={
        fontSize:'22px'
    }
    
    const sendBtn_css={
        float:'right',
        backgroundColor:'#5bdc5b',
        border:'none',
        color:'white',
        padding:'2% 5%',
        cursor:'pointer',
        fontSize:'16px',
    }

    const backBtn_css={
        backgroundColor:'#ffbc00',
        border:'none',
        color:'white',
        padding:'2% 5%',
        cursor:'pointer',
        fontSize:'16px'
    }

    const sendIcon_css={
        position:'relative',
        top:'2px'
    }
    const values_css={
        fontSize:'20px'
    }

    const reviewFields= _.map(formFields,({label,name})=>{
        return (
            <div style={field_css} key={name}>
                <label style={label_css}>{label}</label>
                <div style={values_css}>
                    {formValues[name]}
                </div>

            </div>

        )
    })

    
    return (
        

        <div style={wrapper_css}>
            <span style={confirm_css}>Please confirm your entries:</span>
            {reviewFields}
            <button style={backBtn_css} onClick={onCancel}>
                BACK
            </button>
            <button style={sendBtn_css} onClick={()=>submitSurvey(formValues,history)}>
                    SEND <VscMail style={sendIcon_css}/>  
            </button>
        </div>
    )
}

//what ever we return will show up as props to our component
function mapStateToProps(state){
    return {formValues: state.form.surveyForm.values}
}



export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview))
