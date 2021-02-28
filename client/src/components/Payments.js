import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import * as actions from '../actions'

export class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name='Emaily'
                description="5$ for 5 credits"
                amount={500} //amuont is in USD cents: 500 cents =5 dollars
                //token={token=>actions.handleToken(token)} doesnt work
                token={token=>this.props.handleToken(token)} //callback function to be called after succesfully recieving a token from stripe
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        )
    }
}
export default connect(null,actions)(Payments)
