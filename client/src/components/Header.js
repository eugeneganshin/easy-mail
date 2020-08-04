import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../store/actions/index';
import Payments from './Payments';

class Header extends Component {
	renderContentHandler() {
		switch (this.props.authenticated) {
			case null:
				return 'Still deciding';
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return (
					<React.Fragment>
						{this.telegramLink()}
						<li key="2">
							<Payments />
						</li>
						<li key="3" style={{ margin: '0 10px' }}>
							Credits: <span>{this.props.authenticated.credits}</span>
						</li>
						<li key="4">
							<a onClick={this.props.onLogout}>Logout</a>
						</li>
					</React.Fragment>
				);
		}
	}

	telegramLink() {
		if (this.props.url) {
			return (
				<li key="1">
					<div>
						<a target="_blank" href={`https://t.me/easymailbot?start=${this.props.url}`}>
							Telegram bot!
						</a>
					</div>
				</li>
			);
		}
		return null;
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to={this.props.authenticated ? '/surveys' : '/'} className="brand-logo left">
						<i className="material-icons">email</i>
					</Link>
					<ul className="right">{this.renderContentHandler()}</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authenticated: state.authenticated.authenticated,
		url: state.socket.data,
	};
};

const mapdispatchtoprops = (dispatch) => {
	return {
		onLogout: () => dispatch(actionCreators.logoutUser()),
	};
};

export default connect(mapStateToProps, mapdispatchtoprops)(Header);
