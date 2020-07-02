import React, { Component } from "react";
import { connect } from "react-redux";

import SurveyCard from './SurveyCard'


import * as actionCreators from "../../store/actions/index";

class SurveyList extends Component {
  componentDidMount() {
    this.props.onFetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map((survey, i) => {
      return (
        <SurveyCard
          key={i}
          id={survey._id}
          title={survey.title}
          body={survey.body}
          dateSent={survey.dateSent}
          yes={survey.yes}
          no={survey.no} />
      );
    });
  }

  render() {

    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    surveys: state.surveys,
    socket: state.socket,
    choice: state.socket.choice
  };
};

const mapdispatchtoprops = (dispatch) => {
  return {
    onFetchSurveys: () => dispatch(actionCreators.fetchSurveys()),
    onSocket: () => dispatch({ type: 'server/hello', data: 'Hello!' })
  };
};

export default connect(mapStateToProps, mapdispatchtoprops)(SurveyList);
