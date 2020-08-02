import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';

import SurveyCard from './SurveyCard';

import * as actionCreators from '../../store/actions/index';

class SurveyList extends Component {
	componentDidMount() {
		this.props.onFetchSurveys();
	}

	render() {
		return this.props.surveys.map((survey, i) => {
			return (
				<SurveyCard
					key={i}
					id={survey._id}
					title={survey.title}
					body={survey.body}
					dateSent={survey.dateSent}
					yes={survey.yes}
					no={survey.no}
				/>
			);
		});
	}
}

const mapStateToProps = (state) => {
	return {
		surveys: state.surveys,
	};
};

const mapdispatchtoprops = (dispatch) => {
	return {
		onFetchSurveys: () => dispatch(actionCreators.fetchSurveys()),
	};
};

export default connect(mapStateToProps, mapdispatchtoprops)(SurveyList);
