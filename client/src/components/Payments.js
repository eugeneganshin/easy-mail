import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/index'

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="MERN"
        description="5$ for 5 email credits"
        amount={500}
        token={(token) => this.props.onToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    )
  }
}

const mapdispatchtoprops = (dispatch) => {
  return {
    onToken: (token) => dispatch(actionCreators.handleToken(token)),
  }
}

export default connect(null, mapdispatchtoprops)(Payments)
