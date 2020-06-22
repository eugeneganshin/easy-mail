import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actionCreators from '../store/actions/index'
import Payments from './Payments'

class Header extends Component {
  renderContentHandler() {
    switch (this.props.authenticated) {
      case null:
        return 'Still deciding'
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        )
      default:
        return (
          <React.Fragment>
            <li key="1">
              <Payments />
            </li>
            <li key="2" style={{ margin: '0 10px' }}>
              Credits: <span>{this.props.authenticated.credits}</span>
            </li>
            <li key="3">
              <a onClick={this.props.onLogout}>Logout</a>
            </li>
          </React.Fragment>
        )
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.authenticated ? '/surveys' : '/'}
            className="brand-logo left"
          >
            Logo
          </Link>
          <ul className="right">{this.renderContentHandler()}</ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated.authenticated,
  }
}

const mapdispatchtoprops = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreators.logoutUser()),
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Header)
