import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Payments from './Payments'

export class Header extends Component {
    
    renderContent(link_css){
        const header_element={
            padding:'0 2%'
        }
        switch (this.props.auth){
            case null:
                return
            case false: 
                return (
                    <div><a style={link_css} href="/auth/google">Login with Google</a></div>
                )
            default:
                return [
                <div style={header_element} key='1'><Payments/></div>,
                <div style={header_element} key='3'>Credits: {this.props.auth.credits}</div>,
                <div style={header_element} key='2'><a style={link_css} href="/api/logout">Logout</a></div>
            ]
        }
    }

    render(){
        const wrapper_css={
            width:'100%',
            display:'grid',
            gridTemplateColumns: '30% 70%',
            backgroundColor:'#ff9999',
            color:'white',
            padding:'1%'
        }
        const left_css={
            width:'100%',
            fontSize:'200%',
            paddingLeft:'2%'
        }
        const right_css={
            width:'100%',
            display:'flex',
            justifyContent:'flex-end',
            alignItems:'center',
            fontSize:'110%',   

        }
        const link_css={
            color:'inherit',
            textDecoration: 'none'
        }


        return (
            
                <div style={wrapper_css}>
                   <div style={left_css}> 
                        <Link style={link_css} to={this.props.auth ? '/surveys' : '/'}>
                            Emaily
                        </Link>
                    </div>
                    <div style={right_css}>   
                        {this.renderContent(link_css)}
                    </div>
                </div>
            
        )
    }
}
function mapStateToProps({auth}){
    return {auth}
}
export default connect(mapStateToProps) (Header)
