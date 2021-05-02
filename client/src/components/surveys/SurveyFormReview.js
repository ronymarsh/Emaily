//SurveyFormReview shows users their form inputs for review 
import _ from 'lodash'
import {connect} from 'react-redux'
import formFields from './formFields'
import {withRouter} from 'react-router-dom'
import * as actions from '../../actions'

const SurveyFormReview = ({onCancel,formValues,submitSurvey,history}) => {
    const reviewFields= _.map(formFields,({label,name})=>{
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>

            </div>

        )
    })
    
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow derken-3 btn-flat" onClick={onCancel}>
                Back
            </button>
            <button 
                onClick={()=>submitSurvey(formValues,history)}
                className="green white-text btn-flat right">
                    Send Survey
                    <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

//what ever we return will show up as props to our component
function mapStateToProps(state){
    return {formValues: state.form.surveyForm.values}
}



export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview))
