import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSurveys} from '../../actions'

class SurveyList extends Component{
    componentDidMount(){
        this.props.fetchSurveys()
    }

    renderSurveys(){
        const cardWrapper_css={
            display:'flex', 
            flexDirection:'column',
            border:'1px solid #c7c7c7',
            boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 5%), 0 6px 20px 0 rgba(0, 0, 0, 5%)',
            margin:'1%',
            padding:'2%'
        }
        const title_css={
            fontSize:'28px'
        }

        const votes_css={
            display:'flex',
            justifyContent:'space-around',
            padding:'2%',
            color:'#f8a500'


        }
        const cardContent_css={
            borderBottom:'1px solid #c7c7c7',
        }
        
        return this.props.surveys.reverse().map(survey=>{
            return(
                <div style={cardWrapper_css} key={survey._id}>
                    <div style={cardContent_css}>
                        <span style={title_css}>{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className='right'>
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div style={votes_css}>
                        <a>YES: {survey.yes}</a>
                        <a>NO: {survey.no}</a>
                    </div>
                </div>
            )
        })
    }


    render(){
        return(
            <>
                {this.renderSurveys()}
            </>
         )
    }
} 

function mapStateToProps({surveys}){
    return { surveys };
}

export default connect(mapStateToProps,{fetchSurveys})(SurveyList)