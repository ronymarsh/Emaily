import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import * as actions from '../actions'

export class Payments extends Component {
    render() {
        const btn_css={
            backgroundColor:'#b3ccff',
            border:'none',
            color:'white',
            padding:'3% 5%',
            cursor:'pointer'
        }
        return (
            <StripeCheckout
                name='Emaily'
                description="5$ for 5 credits"
                amount={500} //amuont is in USD cents: 500 cents =5 dollars
                //token={token=>actions.handleToken(token)} doesnt work
                token={token=>this.props.handleToken(token)} //callback function to be called after succesfully recieving a token from stripe
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button style={btn_css}>Add Credits</button>
            </StripeCheckout>
        )
    }
}
export default connect(null,actions)(Payments)
