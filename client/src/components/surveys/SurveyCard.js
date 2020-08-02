import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';

class SurveyCard extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.no !== this.props.no || nextProps.yes !== this.props.yes) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		return (
			<div className="card teal darken-1" key={this.props._id}>
				<div className="card-content white-text">
					<span className="card-title">{this.props.title}</span>
					<p>{this.props.body}</p>
					<p className="right">Sent on: {new Date(this.props.dateSent).toLocaleDateString()}</p>
				</div>
				<div className="card-action">
					<a>Yes: {this.props.yes}</a>
					<a>No: {this.props.no}</a>
				</div>
			</div>
		);
	}
}

// TODO: try ownProps of redux...
// https://stackoverflow.com/questions/33080657/react-update-one-item-in-a-list-without-recreating-all-items

export default SurveyCard;
