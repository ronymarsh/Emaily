//SurveyForm shows a form for the user to add input
import _ from 'lodash'
import React, { Component } from 'react'
import {reduxForm,Field} from 'redux-form'
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'
import {AiOutlineRight} from 'react-icons/ai'


class SurveyForm extends Component {
    renderFields(){
        return _.map(formFields,({label,name})=>{
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        })
    }


    render() {

        const wrapper_css={
            margin:'1% 20%'
        }

        const nextBtn_css={
            float:'right',
            backgroundColor:'rgb(179, 204, 255)',
            border:'none',
            color:'white',
            padding:'2% 5%',
            cursor:'pointer',
            fontSize:'16px',
        }

        const cancelBtn_css={
            backgroundColor:'#f95050',
            border:'none',
            color:'white',
            padding:'2% 5%',
            cursor:'pointer',
            fontSize:'16px'
        }

        const nextIcon_css={
            position:'relative',
            top:'2px'
        }


        return (
            <div style={wrapper_css}>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to='/surveys'>
                    <button style={cancelBtn_css}>
                        CANCEL
                    </button>   
                </Link>
                <button style={nextBtn_css} className='teal btn-flat right white-text' type='submit'>
                    NEXT <AiOutlineRight style={nextIcon_css}/>
                    </button>
                    
                </form>
            </div>
        )
    }
}
function validate(values){
    const errors={}

    errors.recipients=validateEmails(values.recipients ||'')
    
    _.each(formFields,({name})=>{
        if(!values[name]){
            errors[name]='You must provide a value'
        }
    })
    
    return errors
}
export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false
})(SurveyForm);